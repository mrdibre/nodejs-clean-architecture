import { MongoHelper } from "../helpers/mongo-helper";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/account/add-account";
import { AddAccountRepository } from "../../../../data/protocols/database/add-account-repository";

class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");

    const { ops } = await accountCollection.insertOne(accountData);

    return MongoHelper.mapModelToId(ops[0]);
  }
}

export { AccountMongoRepository };
