export interface FormDataType {
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthUserType {
  _id: string;
  email: string;
  fullName: string;
  password: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
}
