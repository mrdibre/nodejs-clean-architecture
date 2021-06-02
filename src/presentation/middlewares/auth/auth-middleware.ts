import { AccessDeniedError } from "@/presentation/errors";
import { Middleware } from "@/presentation/protocols/middleware";
import { HttpResponse, HttpRequest } from "@/presentation/protocols";
import { LoadAccountByToken } from "@/domain/usecases/account/load-account-by-token";
import {
  ok,
  forbidden,
  serverError,
} from "@/presentation/helpers/http/http-helper";

class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.["x-access-token"];

      if (token) {
        const account = await this.loadAccountByToken.load(token, this.role);

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
