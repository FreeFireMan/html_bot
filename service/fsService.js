// const db = require('../database').getInstance();
const ControllerError = require('../error/ControllerError');
const fs = require('fs');
const https = require('https');
const path = require('path');
const postService = require('./postService');


class fsService {
    constructor() {
    }
    downloadedByUrlAndName(url, dest, nameFile) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(path.join(process.cwd(), dest), {recursive: true})
        }
        const file = fs.createWriteStream(dest + nameFile);
        return new Promise((resolve, reject) => {
            let responseSent = false;
            https.get(url, response => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(() => {
                        if (responseSent) return;
                        responseSent = true;
                        resolve(nameFile);
                    });
                });
            }).on('error', err => {
                if (responseSent) return;
                responseSent = true;
                reject(err);
                throw new ControllerError(err, 500, 'fsService/downloadedByUrlAndName');
            });
        })

    }

   async addImages() {
        const outResult = {resolve: [], reject: []};
       const dest = require('./../constants').DESTENATION
        if (fs.existsSync(dest.PHOTO)) {
            const listFiles = fs.readdirSync(dest.PHOTO)

            for (const file of listFiles) {
                const res = await postService.addPathImage(file, dest.PHOTO)
                res[0]
                    ? outResult.resolve.push(file)
                    : outResult.reject.push(file)
            }

        }
       return outResult
    }
    deleteImage(arrayFiles){
        const dest = require('./../constants').DESTENATION
            arrayFiles.forEach(file => {
               const pathFile = path.join(dest.PHOTO,file)
                if (fs.existsSync(pathFile)) {
                    fs.unlinkSync(pathFile);
                }
            })
    }

    // updatePost(postObj, post_id) {
    //     const PostModel = db.getModel('Post');
    //     try {
    //         return PostModel.update(postObj, {
    //             where: {
    //                 id: post_id
    //             },
    //             // returning: true //questionable
    //         });
    //     } catch (e) {
    //         console.log(e);
    //         throw new ControllerError(e.parent.sqlMessage, 500, 'postService/updatePost')
    //     }
    // }
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

module.exports = new fsService();
