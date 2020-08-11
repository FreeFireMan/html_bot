const {userService} = require('./../service');
const removeKeyboard = {reply_markup: {remove_keyboard: true}};
const option = {
    reply_markup: {
        one_time_keyboard: true,
        keyboard: [
            [{text: "Розпочати"}],
            [{text: "Скасувати ❌"}]
        ]
    }
};
module.exports = (bot) => {
    bot.start(ctx => {
        console.log(ctx.from);
        ctx.reply("", removeKeyboard)
        userService.getUser(ctx.from.id).then(res => {
            !res
                ? userService.createUser(ctx.from)
                && ctx.reply("Hello", option)
                : ctx.reply('Hello '
                + res.dataValues.first_name + ' '
                + res.dataValues.last_name, option);
        })

    });
}

