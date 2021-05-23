import { Controller, EmailValidator } from "../../protocols";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import { InvalidParamError } from "../../errors";
import { AddAccount } from "../../../domain/usecases/account/add-account";
import { Validation } from "../../helpers/validators/validation";

class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest) {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }

      const emailIsValid = this.emailValidator.isValid(email);

      if (!emailIsValid) {
        return badRequest(new InvalidParamError("email"));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      return ok(account);
    } catch (e) {
      return serverError(e);
    }
  }
}

export { SignUpController };
