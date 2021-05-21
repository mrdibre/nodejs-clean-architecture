import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from "../../protocols";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import { InvalidParamError, MissingParamError } from "../../errors";
import { Authentication } from "../../../domain/usecases/authentication/authentication";

class LoginController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      if (!email) {
        return badRequest(new MissingParamError("email"));
      } else if (!password) {
        return badRequest(new MissingParamError("password"));
      }
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError("email"));
      }

      const token = await this.authentication.auth(email, password);

      return ok({ token });
    } catch (e) {
      return serverError(e);
    }
  }
}

export { LoginController };
