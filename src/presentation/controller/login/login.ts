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

      const requiredFields = ["email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
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
