import { Middleware } from "../../protocols/middleware";
import { HttpRequest, HttpResponse } from "../../protocols";
import { forbidden, ok, serverError } from "../../helpers/http/http-helper";
import { AccessDeniedError } from "../../errors";
import { LoadAccountByToken } from "../../../domain/usecases/account/load-account-by-token";

class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.["x-access-token"];

      if (token) {
        const account = await this.loadAccountByToken.load(token);

        if (account) {
          return ok({ accountId: account.id });
        }
      }

      return forbidden(new AccessDeniedError());
    } catch (e) {
      return serverError(e);
    }
  }
}

export { AuthMiddleware };
