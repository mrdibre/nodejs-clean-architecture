import { Encrypter } from "../../../protocols/criptography/encrypter";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountRepository } from "../../../protocols/database/add-account-repository";
import {
  AddAccount,
  AddAccountModel,
} from "../../../../domain/usecases/account/add-account";

class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);

    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });

    return account;
  }
}

export { DbAddAccount };
