 const {} =require ('./../service')
module.exports = (bot)=>{
    bot.hears('Розпочати',ctx => {
        ctx.scene.enter('questions')

    })
}
