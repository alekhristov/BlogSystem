export interface IUserController {
    getAllUsers(req, res, next): Promise<void>

}