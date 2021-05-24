import {
  HashComparer,
  Encrypter,
  UpdateAccessTokenRepository,
  LoadAccountByEmailRepository,
} from "../../protocols";
import {
  Authentication,
  AuthenticationModel,
} from "../../../domain/usecases/authentication/authentication";

class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email,
    );

    if (account) {
      const isEquals = await this.hashComparer.compare(
        authentication.password,
        account.password,
      );

      if (isEquals) {
        const token = await this.tokenGenerator.encrypt(account.id);

        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          token,
        );

        return token;
      }
    }

    return null;
  }
}

export { DbAuthentication };
