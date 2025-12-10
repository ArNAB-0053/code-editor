import { NameObjType } from "@/@types/_base";

export const getFullnameFromNameObj = (nameObj: NameObjType) => {
    return nameObj?.firstName?.trim() + " " + nameObj?.middleName?.trim() + " " +  nameObj?.lastName?.trim()
}