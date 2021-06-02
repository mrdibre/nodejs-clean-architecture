import { Authentication } from "@/domain/usecases/authentication/authentication";
import {
  Controller,
  HttpResponse,
  HttpRequest,
  Validation,
} from "@/presentation/protocols";
import {
  badRequest,
  serverError,
  ok,
  unauthorized,
} from "@/presentation/helpers/http/http-helper";

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
