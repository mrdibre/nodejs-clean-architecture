import { AccountModel } from "@/domain/models/account";
import { AddAccountParams } from "@/domain/usecases/account/add-account";
import { AuthenticationParams } from "@/domain/usecases/authentication/authentication";

const mockAccountModel = (): AccountModel => ({
  id: "any_token",
  name: "any_name",
  email: "any_email",
  password: "any_password",
});

const mockAddAccountParams = (): AddAccountParams => ({
  name: "any_name",
  email: "any_email",
  password: "any_password",
});

const mockFakeAuthentication = (): AuthenticationParams => ({
  email: "any_email",
  password: "valid_password",
});

export { mockAccountModel, mockFakeAuthentication, mockAddAccountParams };
