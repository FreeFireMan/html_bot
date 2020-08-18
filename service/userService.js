const db = require('../database').getInstance();
const ControllerError = require('../error/ControllerError');
console.log('db');
console.log(db);

class UserService {

    constructor() {

    }

    createUser(userObj) {
        // const UserModel =  db.getModel('user');
        const UserModel =  db.getModel('User');
        try {
            return UserModel.create(userObj);
        } catch (e) {
            console.log(e);
            throw new ControllerError("MY MSG ERORR: "+e, 500, 'userService/createUser')
        }
    }

    updateUser(userObj, user_id) {
        const UserModel = db.getModel('User');
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
    getUser(id) {
        const UserModel = db.getModel('User');
        try {
            return UserModel.findByPk(id)
        } catch (e) {
            console.log(e);
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/getUser')
        }
    }
}
module.exports = new UserService();
