import { _VisibilityEnum } from "./_enums";
import { IUserDetails } from "./auth";

export interface IShareRequest {
    EditorId: string;
    AllowedUsers: string[] | [];
    Visibility: _VisibilityEnum;
    OwnerDetails: IOwnerDetailsReq;
}

export interface IOwnerDetailsReq {
  UserId: string;
  Name: NameObjType;
  Username: string;
  MobileNo?: string | null;
  Email: string;
}

export interface IOwnerDetails {
  userId: string;
  name: NameObjType;
  username: string;
  mobileNo?: string | null;
  email: string;
}

export interface IShareModel {
    message?: string;
    status: string;
    data: IShareDataModel;
}

export interface IShareDataModel {
  code: string;
  createdAt: string;
  // currentShareCount: number;
  editorId: string ;
  expiresAt: string | null;
  id: string;
  isRevoked: boolean;
  lang: string;
  output: string;
  ownerDetails: IOwnerDetails;
  // shareLimit: number;
  sharedByUserId: string;
  sharedId: string;
  allowedUsers: string[];
}

export interface IShareByMeResRemaining{
  share: IShareDataModel,
  sharedWith: IUserDetails[]
}
export interface IShareByMeRes {
  remaining: IShareByMeResRemaining[],
  share: IShareDataModel,
  sharedWith: IUserDetails[]
}
export interface IShareWithMeRes {
  remaining: IShareDataModel[],
  share: IShareDataModel,
}

export interface IGetShareWithMeDataRequest {
  ShareId: string;
  CurrentUserId: string
}

export interface IGetShareByMeDataRequest {
  SharedId: string;
  OwnerId: string
}


// ----- route: `/lang`
export interface ShareToMeDataType {
  key: string;
  code: string;
  lang: string;
  sharedBy: IOwnerDetails;
  sharedId: string;
}

export interface ShareToMeProps {
  data: IShareDataModel[];
  isLoading: boolean;
}

interface ShareByMeDataType {
  key: string;
  code: string;
  lang: string;
  sharedWith: IUserDetails[];
  sharedId: string;
}

export interface ShareByMeProps {
  data: IShareByMeRes[];
  isLoading: boolean;
}