import { Controller, EmailValidator } from "../../protocols";
import { badRequest, serverError } from "../../helpers/http-helper";
import { MissingParamError, InvalidParamError } from "../../errors";
import { AddAccount } from "../../../domain/usecases/account/add-account";

class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
  ) {}

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

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }

      const emailIsValid = this.emailValidator.isValid(email);

      if (!emailIsValid) {
        return badRequest(new InvalidParamError("email"));
      }

      this.addAccount.add({
        name,
        email,
        password,
      });
    } catch (e) {
      return serverError();
    }
  }
}

export { SignUpController };
