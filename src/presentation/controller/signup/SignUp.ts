import { Controller } from "../../protocols";
import { badRequest, ok, serverError } from "../../helpers/http/http-helper";
import { AddAccount } from "../../../domain/usecases/account/add-account";
import { Validation } from "../../helpers/validators/validation";

class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest) {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = httpRequest.body;

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
