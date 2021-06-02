import { makeSignUpValidation } from "./signup-validation-factory";
import { SignUpController } from "@/presentation/controller/auth/signup/signup-controller";
import { makeDbAddAccountFactory } from "@/main/factories/usecases/auth/add-account/db-add-account-factory";
import { makeLogControllerDecoratorFactory } from "@/main/factories/decorators/log-controller-decorator-factory";
import { makeDbAuthenticationFactory } from "@/main/factories/usecases/auth/authentication/db-authentication-factory";

const makeSignUpController = () => {
  const signUpController = new SignUpController(
    makeDbAddAccountFactory(),
    makeSignUpValidation(),
    makeDbAuthenticationFactory(),
  );

  return makeLogControllerDecoratorFactory(signUpController);
};

export { makeSignUpController };
