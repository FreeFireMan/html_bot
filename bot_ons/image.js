const {userService} = require('./../service');

module.exports = (bot) => {
  bot.on('photo',ctx => {
    console.log(ctx.from);
    userService.getUser(ctx.from.id)
        .then(user => {
          console.log(user);
        })
    ctx.reply("thank you for contact")
    // userService.updateUser(ctx.update.message.contact)
  });
}
