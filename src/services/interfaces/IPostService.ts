import { IPostModel } from "../../models/postModel";

export interface IPostService {
    getAllPostsFromDb(): Promise<IPostModel[]>
    createPostForUserInDb(newPost: IPostModel): Promise<void>
}