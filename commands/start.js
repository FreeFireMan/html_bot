const {userService} = require('./../service');
const {start_keyboard} = require('./../constants').KEYBOARD
module.exports = (bot) => {
    bot.start(ctx => {
        // ctx.reply("start", removeKeyboard)
        userService.getUser(ctx.from.id).then(res => {
            console.log(res);
            !res
                ? userService.createUser(ctx.from)
                && ctx.reply("Hello", start_keyboard)
                : ctx.reply('Hello '
                + res.first_name + ' '
                + res.last_name, start_keyboard);
        })
    });
}

