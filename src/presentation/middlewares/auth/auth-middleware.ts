import { Middleware } from "../../protocols/middleware";
import { HttpRequest, HttpResponse } from "../../protocols";
import { forbidden } from "../../helpers/http/http-helper";
import { AccessDeniedError } from "../../errors";
import { LoadAccountByToken } from "../../../domain/usecases/account/load-account-by-token";

class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const token = httpRequest.headers?.["x-access-token"];

    if (token) {
      await this.loadAccountByToken.load(token);
    }

    return forbidden(new AccessDeniedError());
  }
}

export { AuthMiddleware };
