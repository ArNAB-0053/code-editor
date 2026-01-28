import { IBaseReturn } from "./_base";

// CREATE
export interface ISocialModal {
    UserId: string;
    GithubUsername: string;
    AvatarUrl?: string;
    GithubFullName?: string;
    Provider: string;
    ProviderId: string;
    AccessToken: string;
    RefreshToken?: string;
    Scope?: string;
}

export interface ISocialRes extends IBaseReturn {
    data: ISocialModal
}