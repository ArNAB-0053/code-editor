import { IProfileDetails, NameObjType } from "@/@types/_base";
import { ProviderTypeEnumString } from "@/@types/_enums";

export const fallbackAvatar: NameObjType = {
  firstName: "Guest Account",
  middleName: "",
  lastName: "",
};

export const fallbackInitial: string = "G"

export const fallbackProfileDetails: IProfileDetails = {
  name: "Guest Account",
  email: "guest@example.com",
  nameObj: fallbackAvatar,
  userId: "",
  password: "",
  username: "guest",
  provider: ProviderTypeEnumString.NORMAL
}

export const fallbackUserLocalStorage = {
  id: "",
  name: {
    firstName: "Guest",
    middleName: "",
    lastName: "",
  },
  email: "",
  username: "",
  _persistedAt: null,
};