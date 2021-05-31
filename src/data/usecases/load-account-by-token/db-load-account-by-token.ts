import { LoadAccountByToken } from "../../../domain/usecases/account/load-account-by-token";
import { AccountModel } from "../../../domain/models/account";
import { Decrypter } from "../../protocols/criptography/decrypter";

class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(token: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(token);
    return null;
  }
}

export { DbLoadAccountByToken };
