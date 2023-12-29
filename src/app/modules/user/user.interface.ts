import { USER_ROLE } from './user.constant';

export interface TUser {
  username: string;
  email: string;
  password: string;
  previousPassword:{
     firstPassword:string;
     secondPassword:string;
  };
  role: 'admin' | 'user';
}

export type TLoginUser = {
  username: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE;
