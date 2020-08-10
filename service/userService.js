const db = require('../database').getInstance();
const ControllerError = require('../error/ControllerError');


class UserService {
    constructor() {
    }

    createUser(userObj) {
        const UserModel =  db.getModel('user');
        try {
            return UserModel.create(userObj);
        } catch (e) {
            console.log(e);
            throw new ControllerError("MY MSG ERORR: "+e, 500, 'userService/createUser')
        }
    }

    updateUser(userObj, user_id) {
        const UserModel = db.getModel('user');
        try {
            return UserModel.update(userObj, {
                where: {
                    id: user_id
                },
                // returning: true //questionable
            });
        } catch (e) {
            console.log(e);
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/updateUser')
        }
    }
    // getPosts() {
    //     const PostModel = db.getModel('post');
    //     try {
    //         return PostModel.findAll({});
    //     } catch (e) {
    //         console.log(e);
    //         throw new ControllerError(e.parent.sqlMessage, 500, 'postService/getPosts')
    //     }
    // }
}
module.exports = new PostService();
