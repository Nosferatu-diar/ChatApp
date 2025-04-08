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
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MessageType {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  text?: string;
}

export interface SendMessagePayload {
  text: string;
}
