const db = require('../database').getInstance();
const ControllerError = require('../error/ControllerError');

class RoleService {

  constructor() {

  }

  createRole(role) {
    // const UserModel =  db.getModel('user');
    const RoleModel = db.getModel('Role');
    try {
      return RoleModel.create({role}, {raw: true});
    } catch (e) {
      console.log(e);
      throw new ControllerError("MY MSG ERORR: " + e, 500, 'userService/createUser')
    }
  }

  // updateUser(userObj) {
  //   const UserModel = db.getModel('User');
  //   try {
  //     return UserModel.update(userObj, {
  //       where: {
  //         id: userObj.user_id
  //       },
  //       // returning: true //questionable
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     throw new ControllerError(e.parent.sqlMessage, 500, 'userService/updateUser')
  //   }
  // }
  // getUser(id) {
  //   const UserModel = db.getModel('User');
  //
  //   try {
  //     // return UserModel.findByPk(id,{include: ['roleId']})
  //     return UserModel.findOne({
  //           where: {id},
  //           include: 'role',
  //           raw: true,
  //           nest: true
  //         }
  //     )
  //   } catch (e) {
  //     console.log(e);
  //     throw new ControllerError(e.parent.sqlMessage, 500, 'userService/getUser')
  //   }
  // }
}

module.exports = new RoleService();
