import { BcryptAdapter } from "../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { DbAddAccount } from "../../../../../data/usecases/add-account/db-add-account/db-add-account";
import { AccountMongoRepository } from "../../../../../infra/database/mongodb/account-repository/account-repository";

const makeDbAddAccountFactory = () => {
  const bcryptAdapter = new BcryptAdapter(12);
  const addRepository = new AccountMongoRepository();

  return new DbAddAccount(bcryptAdapter, addRepository, addRepository);
};

export { makeDbAddAccountFactory };
