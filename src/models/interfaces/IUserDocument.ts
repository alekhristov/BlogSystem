export interface IUserDocument extends Document {
    username: string;
    name: string;
    password: string;
}