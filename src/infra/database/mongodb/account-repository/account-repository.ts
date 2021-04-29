import { MongoHelper } from "../helpers/mongo-helper";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/account/add-account";
import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";

class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");

    const { ops } = await accountCollection.insertOne(accountData);

    const { _id, ...account } = ops[0];

    return {
      id: _id,
      ...account,
    };
  }
}

export { AccountMongoRepository };
