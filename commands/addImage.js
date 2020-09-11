const {fsService} = require('./../service');

module.exports = (bot) => {
    bot.command('/add_images',ctx => {
        fsService.addImages()
            .then(res=>{
                if(res.reject.length !== 0)
                {
                    fsService.deleteImage(res.reject)
                    ctx.reply('this image is reject '+res.reject)
                }else{
                    ctx.reply('it is ok')
                }
            })
    })
}

