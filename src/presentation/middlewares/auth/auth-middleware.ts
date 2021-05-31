import { Middleware } from "../../protocols/middleware";
import { HttpRequest, HttpResponse } from "../../protocols";
import { forbidden } from "../../helpers/http/http-helper";
import { AccessDeniedError } from "../../errors";

class AuthMiddleware implements Middleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError());
  }
}

export { AuthMiddleware };
