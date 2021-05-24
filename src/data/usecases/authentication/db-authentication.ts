import {
  Authentication,
  AuthenticationModel,
} from "../../../domain/usecases/authentication/authentication";
import { LoadAccountByEmailRepository } from "../../protocols/database/load-account-by-email-repository";

class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email);

    return null;
  }
}

export { DbAuthentication };
