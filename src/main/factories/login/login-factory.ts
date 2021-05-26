import Env from "../../config/env";
import { makeLoginValidation } from "./login-validation";
import { LogControllerDecorator } from "../../decorators/log/log-controller-decorator";
import { LoginController } from "../../../presentation/controller/login/login-controller";
import { LogMongoRepository } from "../../../infra/database/mongodb/log-repository/LogMongoRepository";
import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication";
import { AccountMongoRepository } from "../../../infra/database/mongodb/account-repository/account-repository";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "../../../infra/criptography/jwt-adapter/jwt-adapter";

const makeLoginController = () => {
  const accountMongoRepository = new AccountMongoRepository();
  const hashComparer = new BcryptAdapter(12);
  const jwtAdapter = new JwtAdapter(Env.jwtSecret);

  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    hashComparer,
    jwtAdapter,
    accountMongoRepository,
  );

  const signUpController = new LoginController(
    dbAuthentication,
    makeLoginValidation(),
  );

  const logRepository = new LogMongoRepository();

  return new LogControllerDecorator(signUpController, logRepository);
};

export { makeLoginController };
