import { injectable } from "inversify";
import { User, IUserModel } from "../models/userModel";

@injectable()
export class UserService {
    
    public async registerUserInDb(newUser: IUserModel): Promise<void> {
        await newUser.save();
        console.log("User registered successfully!")
    };

    public async getUserByUsernameFromDb(username: string): Promise<IUserModel> {
        return await User.findOne({ "username": username }).exec();
    };

    public async getAllUsersFromDb(): Promise<IUserModel[]> {
        return User.find({}).exec();
    };
}