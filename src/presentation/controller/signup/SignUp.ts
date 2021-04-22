import { Controller } from "../../protocols/controller";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest } from "../../helpers/http-helper";
import { EmailValidator } from "../../protocols/email-validator";

class SignUpController implements Controller {
  constructor(private emailValidator: EmailValidator) {}

  handle(httpRequest) {
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}

export { SignUpController };
