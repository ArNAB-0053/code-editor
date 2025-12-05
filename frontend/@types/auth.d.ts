export interface ISignInReturn {
    message: string,
    status: "success" | "error",
    user: IUserDetails
}

export interface IUserDetails {
    id: string,
    email: string,
    name: string,
    username: string,
}