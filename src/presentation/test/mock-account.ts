import { AddAccount } from "@/domain/usecases/account/add-account";
import { mockAccountModel } from "@/domain/test";
import {
  Authentication,
  AuthenticationParams,
} from "@/domain/usecases/authentication/authentication";

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

export { mockAccount, mockAuthentication };
