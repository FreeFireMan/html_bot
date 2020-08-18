const {userService} = require('./../service');
const removeKeyboard = {reply_markup: {remove_keyboard: true}};
module.exports = (bot) => {
    bot.on('contact',ctx => {
        console.log("ctx.update.message.contact");
        console.log(ctx.update.message.contact);
        ctx.reply("thank you for contact", removeKeyboard)
        userService.updateUser(ctx.update.message.contact,ctx.update.message.contact.user_id)
    });
}
