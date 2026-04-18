import { UserType } from "@/types/data";

export interface PayloadUpdatePass {
  email: string;
  password: string;
}

export interface PayloadUpdateEmail {
  email: string;
  phone: string;
}

export interface PayloadUpdateAvatar {
  image: string;
  codeuser: string;
}

export interface PayloadAddContact {
  name: string;
  email: string;
  des: string;
}

export interface DataUser{
    error: number,
    message: string,
    data: UserType
}

export interface ResponseUser {
  data: DataUser
}