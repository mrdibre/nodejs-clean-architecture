import { MongoHelper } from "../helpers/mongo-helper";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/account/add-account";
import {
  AddAccountRepository,
  UpdateAccessTokenRepository,
  LoadAccountByEmailRepository,
} from "../../../../data/protocols";

class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");

    const { ops } = await accountCollection.insertOne(accountData);

    return MongoHelper.mapModelToId(ops[0]);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const account = await accountCollection.findOne({ email });

    return account ? MongoHelper.mapModelToId(account) : null;
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection("accounts");

    await accountCollection.updateOne(
      { _id: id },
      { $set: { accessToken: token } },
    );
  }
}

export { AccountMongoRepository };
