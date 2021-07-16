import { mockAccountModel } from "@/domain/test";
import { AccountModel } from "@/domain/models/account";
import { AddAccountParams } from "@/domain/usecases/account/add-account";
import { LoadAccountByTokenRepository } from "@/data/protocols/database/account/load-account-by-token-repository";
import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from "@/data/protocols";

const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }

  return new AddAccountRepositoryStub();
};

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<AccountModel> {
      return mockAccountModel();
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const mockLoadAccountByTokenRepository = () => {
  class LoadAccountByTokenRepositoryStub
    implements LoadAccountByTokenRepository {
    async loadByToken(value: string, role?: string): Promise<AccountModel> {
      return mockAccountModel();
    }
  }

  return new LoadAccountByTokenRepositoryStub();
};

const mockUpdateAccessToken = () => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {
      return;
    }
  }

  return new UpdateAccessTokenRepositoryStub();
};

export {
  mockUpdateAccessToken,
  mockAddAccountRepository,
  mockLoadAccountByTokenRepository,
  mockLoadAccountByEmailRepository,
};
