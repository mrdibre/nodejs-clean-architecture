import { Controller, EmailValidator } from "../../protocols";
import { badRequest, serverError } from "../../helpers/http-helper";
import { MissingParamError, InvalidParamError } from "../../errors";

class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest) {
    try {
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

      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email);

      if (!emailIsValid) {
        return badRequest(new InvalidParamError("email"));
      }
    } catch (e) {
      return serverError();
    }
  }
}

export { SignUpController };
