import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from "../../protocols";
import { badRequest } from "../../helpers/http-helper";
import { InvalidParamError, MissingParamError } from "../../errors";

class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("email"));
    } else if (!httpRequest.body.password) {
      return badRequest(new MissingParamError("password"));
    } else if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return badRequest(new InvalidParamError("email"));
    }
  }
}

export { LoginController };
