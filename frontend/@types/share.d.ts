export interface IShareRequest {
    EditorId: string;
    SharedByUserId: string,
    ShareLimit: number;
    ExpireMinutes: number; 
}

export interface IShareModel {
    message?: string;
    status: string;
    data: IShareDataModel;
}

export interface IShareDataModel {
  code: string;
  createdAt: string;
  currentShareCount: number;
  editorId: string;
  expiresAt: string;
  id: string;
  isRevoked: boolean;
  lang: string;
  output: string;
  ownerId: string;
  shareLimit: number;
  sharedByUserId: string;
  sharedId: string;
  sharedToUsers: string[];
}
