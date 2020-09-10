
const {userService, fsService,postService} = require('./../service');
const {
    USERROLES: roles,
    DESTENATION: localPath,
    MIMETYPE: mimeType } = require('./../constants')

module.exports = (bot) => {
    bot.on('document', ctx => {
        const {file_id, file_name, mime_type} = ctx.message.document
        if(mime_type.split('/').shift() === mimeType.IMAGE) {
        userService.getUser(ctx.from.id)
            .then(user => {
                if (user.role.role === roles.CONTENT) {
                    ctx.telegram.getFileLink(file_id).then(url => {
                        fsService.downloadedByUrlAndName(url, localPath.PHOTO,file_name)
                            .then(result => {
                                ctx.reply("thank you for image "+result)
                            })
                    })
                }
            })
        }
    });
}
