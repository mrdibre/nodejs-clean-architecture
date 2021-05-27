import { LogControllerDecorator } from "../../decorators/log/log-controller-decorator";
import { SignUpController } from "../../../presentation/controller/signup/signup-controller";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account/db-add-account";
import { AccountMongoRepository } from "../../../infra/database/mongodb/account-repository/account-repository";
import { LogMongoRepository } from "../../../infra/database/mongodb/log-repository/LogMongoRepository";
import { makeSignUpValidation } from "./signup-validation-factory";
import { JwtAdapter } from "../../../infra/criptography/jwt-adapter/jwt-adapter";
import Env from "../../config/env";
import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication";

const makeSignUpController = () => {
  const accountMongoRepository = new AccountMongoRepository();
  const hashComparer = new BcryptAdapter(12);
  const jwtAdapter = new JwtAdapter(Env.jwtSecret);

  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    hashComparer,
    jwtAdapter,
    accountMongoRepository,
  );

  const bcryptAdapter = new BcryptAdapter(12);
  const addRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addRepository);

  const signUpController = new SignUpController(
    dbAddAccount,
    makeSignUpValidation(),
    dbAuthentication,
  );

  const logRepository = new LogMongoRepository();

  return new LogControllerDecorator(signUpController, logRepository);
};

export { makeSignUpController };
