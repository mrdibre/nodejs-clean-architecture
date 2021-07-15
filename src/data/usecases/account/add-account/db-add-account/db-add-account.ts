import { AccountModel } from "@/domain/models/account";
import {
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository,
} from "@/data/protocols";
import {
  AddAccount,
  AddAccountParams,
} from "@/domain/usecases/account/add-account";

class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async add(accountData: AddAccountParams): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.hash(accountData.password);

    const alreadyExists = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email,
    );

    if (alreadyExists) {
      return null;
    }

    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });

    return account;
  }
}

export { DbAddAccount };
