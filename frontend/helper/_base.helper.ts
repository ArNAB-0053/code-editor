import { NameObjType } from "@/@types/_base";

export const getFullnameFromNameObj = (nameObj: NameObjType) => {
    return nameObj?.firstName?.trim() + " " + nameObj?.middleName?.trim() + " " +  nameObj?.lastName?.trim()
}

export const EDITOR_HEIGHT = 'calc(100svh)'
export const eHEIGHT = `calc(${EDITOR_HEIGHT} - 55px)`