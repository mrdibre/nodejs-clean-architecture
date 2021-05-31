import { makeLoginValidation } from "./login-validation";
import { LoginController } from "../../../../../presentation/controller/auth/login/login-controller";
import { makeDbAuthenticationFactory } from "../../../usecases/authentication/db-authentication-factory";
import { makeLogControllerDecoratorFactory } from "../../../decorators/log-controller-decorator-factory";

const makeLoginController = () => {
  const loginController = new LoginController(
    makeDbAuthenticationFactory(),
    makeLoginValidation(),
  );

  return makeLogControllerDecoratorFactory(loginController);
};

export { makeLoginController };
