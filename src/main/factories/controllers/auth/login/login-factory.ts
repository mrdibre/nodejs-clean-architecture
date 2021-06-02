import { makeLoginValidation } from "./login-validation";
import { LoginController } from "@/presentation/controller/auth/login/login-controller";
import { makeLogControllerDecoratorFactory } from "@/main/factories/decorators/log-controller-decorator-factory";
import { makeDbAuthenticationFactory } from "@/main/factories/usecases/auth/authentication/db-authentication-factory";

const makeLoginController = () => {
  const loginController = new LoginController(
    makeDbAuthenticationFactory(),
    makeLoginValidation(),
  );

  return makeLogControllerDecoratorFactory(loginController);
};

export { makeLoginController };
