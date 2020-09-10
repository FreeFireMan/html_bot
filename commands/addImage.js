const {fsService} = require('./../service');

module.exports = (bot) => {
    bot.command('/add_images',ctx => {
        fsService.addImages()
            .then(res=>{
                fsService.deleteImage(res.reject)
                ctx.reply('this image is reject '+res.reject)
            })
    })
}

