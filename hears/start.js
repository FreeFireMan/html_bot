 const {} =require ('./../service')
module.exports = (bot)=>{
    bot.hears('Розпочати',ctx => {

        ctx.reply("Go-go")
        ctx.replyWithPhoto('https://photos.app.goo.gl/U5J3Rz3RaPCwTTmDA')
    })
}
