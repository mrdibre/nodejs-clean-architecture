import { Encrypter } from "../../../protocols/encrypter";
import { AccountModel } from "../../../../domain/models/account";
import {
  AddAccount,
  AddAccountModel,
} from "../../../../domain/usecases/account/add-account";

class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return Promise.resolve("valid_password");
  }
}

export { DbAddAccount };
