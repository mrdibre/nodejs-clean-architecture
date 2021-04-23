import { Controller } from "../../protocols/controller";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest } from "../../helpers/http-helper";
import { EmailValidator } from "../../protocols/email-validator";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { ServerError } from "../../errors/server-error";

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
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}

export { SignUpController };
