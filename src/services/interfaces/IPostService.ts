import { IPostModel } from "../../models/Post";

export interface IPostService {
    getAllPostsFromDb(): Promise<IPostModel[]>
    createPostForUserInDb(newPost: IPostModel): Promise<void>
}