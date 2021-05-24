import { HashComparer } from "../../protocols/criptography/hash-comparer";
import { LoadAccountByEmailRepository } from "../../protocols/database/load-account-by-email-repository";
import {
  Authentication,
  AuthenticationModel,
} from "../../../domain/usecases/authentication/authentication";

class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const user = await this.loadAccountByEmailRepository.load(
      authentication.email,
    );

    if (user) {
      const isEquals = await this.hashComparer.compare(
        authentication.password,
        user.password,
      );

      if (isEquals) {
        return "any_token";
      }
    }

    return null;
  }
}

export { DbAuthentication };
