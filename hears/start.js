const removeKeyboard = {reply_markup: {remove_keyboard: true}};
module.exports = (bot)=>{
    bot.hears('Розпочати',ctx => {
        ctx.reply("Go-go", removeKeyboard)
    })
}
