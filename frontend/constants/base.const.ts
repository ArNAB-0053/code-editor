import { IProfileDetails, NameObjType } from "@/@types/_base";

export const fallbackAvatar: NameObjType = {
  firstName: "Guest",
  middleName: "",
  lastName: "",
};

export const fallbackInitial: string = "G"

export const fallbackProfileDetails: IProfileDetails = {
  name: "Guest",
  email: "guest@example.com",
  nameObj: fallbackAvatar,
  userId: "",
  password: "",
  username: "guest",
}