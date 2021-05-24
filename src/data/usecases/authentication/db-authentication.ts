import { HashComparer } from "../../protocols/criptography/hash-comparer";
import { TokenGenerator } from "../../protocols/criptography/token-generator";
import { LoadAccountByEmailRepository } from "../../protocols/database/load-account-by-email-repository";
import {
  Authentication,
  AuthenticationModel,
} from "../../../domain/usecases/authentication/authentication";
import { UpdateAccessTokenRepository } from "../../protocols/database/update-access-token-repository";

class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email,
    );

    if (account) {
      const isEquals = await this.hashComparer.compare(
        authentication.password,
        account.password,
      );

      if (isEquals) {
        const token = await this.tokenGenerator.generate(account.id);

        await this.updateAccessTokenRepository.update(account.id, token);

        return token;
      }
    }

    return null;
  }
}

export { DbAuthentication };
