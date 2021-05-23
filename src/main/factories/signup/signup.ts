import { LogControllerDecorator } from "../../decorators/log/log";
import { SignUpController } from "../../../presentation/controller/signup/SignUp";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt/bcrypt-adapter";
import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account/db-add-account";
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter/email-validator-adapter";
import { AccountMongoRepository } from "../../../infra/database/mongodb/account-repository/account-repository";
import { LogMongoRepository } from "../../../infra/database/mongodb/log-repository/LogMongoRepository";
import { makeSignUpValidation } from "./signup-validation";

const makeSignUpController = () => {
  const emailValidator = new EmailValidatorAdapter();

  const bcryptAdapter = new BcryptAdapter(12);
  const addRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addRepository);

  const signUpController = new SignUpController(
    emailValidator,
    dbAddAccount,
    makeSignUpValidation(),
  );

  const logRepository = new LogMongoRepository();

  return new LogControllerDecorator(signUpController, logRepository);
};

export { makeSignUpController };
