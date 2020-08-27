const {userService} = require('./../service');

module.exports = (bot) => {
    bot.on('contact',ctx => {
       ctx.reply("thank you for contact")
        userService.updateUser(ctx.update.message.contact)
    });
}
