import { Controller } from "../../protocols";
import { Validation } from "../../protocols/validation";
import { AddAccount } from "../../../domain/usecases/account/add-account";
import { badRequest, ok, serverError } from "../../helpers/http/http-helper";
import { Authentication } from "../../../domain/usecases/authentication/authentication";

class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest) {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = httpRequest.body;

      await this.addAccount.add({
        name,
        email,
        password,
      });

      const token = await this.authentication.auth({ email, password });

      return ok({ token });
    } catch (e) {
      return serverError(e);
    }
  }
}

export { SignUpController };
