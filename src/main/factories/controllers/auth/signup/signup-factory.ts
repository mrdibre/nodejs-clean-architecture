import { makeSignUpValidation } from "./signup-validation-factory";
import { makeDbAddAccountFactory } from "../../../usecases/add-account/db-add-account-factory";
import { SignUpController } from "../../../../../presentation/controller/auth/signup/signup-controller";
import { makeDbAuthenticationFactory } from "../../../usecases/authentication/db-authentication-factory";
import { makeLogControllerDecoratorFactory } from "../../../decorators/log-controller-decorator-factory";

const makeSignUpController = () => {
  const signUpController = new SignUpController(
    makeDbAddAccountFactory(),
    makeSignUpValidation(),
    makeDbAuthenticationFactory(),
  );

  return makeLogControllerDecoratorFactory(signUpController);
};

export { makeSignUpController };
