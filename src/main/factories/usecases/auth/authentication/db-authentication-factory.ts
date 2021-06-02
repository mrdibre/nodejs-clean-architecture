import Env from "@/main/config/env";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/jwt-adapter";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { DbAuthentication } from "@/data/usecases/authentication/db-authentication";
import { AccountMongoRepository } from "@/infra/database/mongodb/account-repository/account-repository";

const makeDbAuthenticationFactory = () => {
  const accountMongoRepository = new AccountMongoRepository();
  const hashComparer = new BcryptAdapter(12);
  const jwtAdapter = new JwtAdapter(Env.jwtSecret);

  return new DbAuthentication(
    accountMongoRepository,
    hashComparer,
    jwtAdapter,
    accountMongoRepository,
  );
};

export { makeDbAuthenticationFactory };
