import Env from "@/main/config/env";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/jwt-adapter";
import { LoadAccountByToken } from "@/domain/usecases/account/load-account-by-token";
import { AccountMongoRepository } from "@/infra/database/mongodb/account-repository/account-repository";
import { DbLoadAccountByToken } from "@/data/usecases/load-account-by-token/db-load-account-by-token";

const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(Env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();

  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};

export { makeDbLoadAccountByToken };
