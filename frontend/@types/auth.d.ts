import { NameObjType } from "./_base";

export interface IAuthReturn {
    message: string,
    status: "success" | "error",
    user: IUserDetails
}

export interface IUserDetails {
    id: string,
    email: string,
    name: NameObjType,
    username: string,
}

export interface IAvailability {
    available: boolean,
    message?: string
}

export interface IRegister {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface ISearchResultEach {
    name: NameObjType,
    username: string,
    userId: string,
    email: string
}

export type ISearchResult = ISearchResultEach[]