export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserParams {
  email?: string;
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

export interface UploadImageResponse {
  profileImageUrl: string;
}
