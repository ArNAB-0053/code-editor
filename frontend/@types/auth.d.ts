import { NameObjType } from "./_base";
import { ProviderTypeEnumString } from "./_enums";

export interface IAuthReturn {
  message: string;
  status: "success" | "error";
  user: IUserDetails;
}

export interface IUserDetails {
  id: string;
  email: string;
  name: NameObjType;
  username: string;
  mobileNo?: string | null;
  provider?: ProviderTypeEnumString;
}

export interface IAvailability {
  available: boolean;
  message?: string;
}

export interface IRegister {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface ISearchResultEach {
  name: NameObjType;
  username: string;
  userId: string;
  email: string;
}

export type ISearchResult = ISearchResultEach[];

export interface IRegisterRequest {
  name: NameObjType;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export type ProviderType = "GITGUB" | "GOOGLE" | "NORMAL"

export interface IRegisterUsingProviderRequest {
  name: NameObjType;
  email: string;
  username: string;
  provider: ProviderTypeEnumString;
  providerId: string;
}

// Change Password
export interface IChangePassRequest {
  Id: string;
  Username: string;
  OldPassword: string;
  NewPassword: string;
  ConfirmNewPassword: string;
}
