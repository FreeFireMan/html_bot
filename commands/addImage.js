

module.exports = (bot)=>{
    bot.command('/add_images',
        ctx => ctx.scene.enter('add_images')
    )
}
