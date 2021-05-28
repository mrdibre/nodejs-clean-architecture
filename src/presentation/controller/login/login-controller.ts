import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { Validation } from "../../protocols/validation";
import { Authentication } from "../../../domain/usecases/authentication/authentication";
import {
  ok,
  badRequest,
  serverError,
  unauthorized,
} from "../../helpers/http/http-helper";

class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const { email, password } = httpRequest.body;

      const token = await this.authentication.auth({ email, password });

      console.log(token);

      if (!token) {
        return unauthorized();
      }

      return ok({ token });
    } catch (e) {
      return serverError(e);
    }
  }
}

export { LoginController };
