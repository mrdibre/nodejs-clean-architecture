import { AccountModel } from "@/domain/models/account";
import { AddAccountParams } from "@/domain/usecases/account/add-account";

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

export { mockAccountModel, mockAddAccountParams };
