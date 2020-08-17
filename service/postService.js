const db = require('../database/models');
const ControllerError = require('../error/ControllerError');

class PostService {
    constructor() {
    }

    createPost(postObj) {
        const PostModel =  db.getModel('post');
        try {
            return PostModel.create(postObj);
        } catch (e) {
            console.log(e);
            throw new ControllerError("MY MSG ERORR: "+e, 500, 'postService/createPost')
        }
    }

    updatePost(postObj, post_id) {
        const PostModel = db.getModel('post');
        try {
            return PostModel.update(postObj, {
                where: {
                    id: post_id
                },
                // returning: true //questionable
            });
        } catch (e) {
            console.log(e);
            throw new ControllerError(e.parent.sqlMessage, 500, 'postService/updatePost')
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
