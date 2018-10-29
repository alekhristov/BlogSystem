export interface IUser {
  name: string;
  username: string;
  password: string;
  email?: string;

  isValidPassword(password: string, user: IUser): Promise<Boolean>;
};