

const db = require('../database').getInstance();
const ControllerError = require('../error/ControllerError');

class PostService {
    constructor() {
    }

    createPost(postObj) {
        const PostModel =  db.getModel('Post');
        try {
            return PostModel.create(postObj);
        } catch (e) {
            console.log(e);
            throw new ControllerError("MY MSG ERORR: "+e, 500, 'postService/createPost')
        }
    }

    updatePost(postObj, post_id) {
        const PostModel = db.getModel('Post');
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
    addPathImage(fullname, path) {
        const PostModel = db.getModel('Post');
        const postObj = {path_image: path+fullname}
        try {
            return PostModel.update(postObj, {
                where: {
                    name_image: fullname.split('.').shift()
                },
                // returning: true //questionable
            });
        } catch (e) {
            console.log(e);
            throw new ControllerError(e.parent.sqlMessage, 500, 'postService/addPathImage')
        }
    }

}
module.exports = new PostService();
