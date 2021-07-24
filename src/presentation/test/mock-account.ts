import { AddAccount } from "@/domain/usecases/account/add-account";
import { mockAccountModel } from "@/domain/test";
import {
  Authentication,
  AuthenticationParams,
} from "@/domain/usecases/authentication/authentication";
import { LoadAccountByToken } from "@/domain/usecases/account/load-account-by-token";
import { AccountModel } from "@/domain/models/account";

const mockAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account) {
      return mockAccountModel();
    }
  }

  return new AddAccountStub();
};

const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationParams): Promise<string> {
      return "any_token";
    }
  }

  return new AuthenticationStub();
};

const mockLoadAccountByToken = () => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(token: string): Promise<AccountModel> {
      return mockAccountModel();
    }
  }

  return new LoadAccountByTokenStub();
};

export { mockLoadAccountByToken, mockAccount, mockAuthentication };
