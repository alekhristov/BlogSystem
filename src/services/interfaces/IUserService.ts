import { IUserModel } from "../../models/userModel";

export interface IUserService {
    registerUserInDb(newUser: IUserModel): Promise<void>
    getUserByUsernameFromDb(username: string): Promise<IUserModel>
    getAllUsersFromDb(): Promise<IUserModel[]>
}