import { AccountModel } from "../../../../domain/models/account";
import { Hasher, AddAccountRepository } from "../../../protocols";
import {
  AddAccount,
  AddAccountModel,
} from "../../../../domain/usecases/account/add-account";

class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.hash(accountData.password);

    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });

    return account;
  }
}

export { DbAddAccount };
