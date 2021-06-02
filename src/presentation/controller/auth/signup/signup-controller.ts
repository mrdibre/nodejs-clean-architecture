import { Validation } from "@/validation/protocols";
import { Controller } from "@/presentation/protocols";
import { EmailInUseError } from "@/presentation/errors";
import { AddAccount } from "@/domain/usecases/account/add-account";
import { Authentication } from "@/domain/usecases/authentication/authentication";
import {
  ok,
  forbidden,
  badRequest,
  serverError,
} from "@/presentation/helpers/http/http-helper";

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

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      if (!account) {
        return forbidden(new EmailInUseError());
      }

      const token = await this.authentication.auth({ email, password });

      return ok({ token });
    } catch (e) {
      return serverError(e);
    }
  }
}

export { SignUpController };
