const {userService} = require('./../service');
const removeKeyboard = {reply_markup: {remove_keyboard: true}};
const option = {
    reply_markup: {
        one_time_keyboard: true,
        keyboard: [
            [{text: "Розпочати", request_contact : true}],
            [{text: "Скасувати ❌"}]
        ]
    }
};
module.exports = (bot) => {
    bot.start(ctx => {
        // ctx.reply("start", removeKeyboard)
        userService.getUser(ctx.from.id).then(res => {
            console.log(res);
            !res
                ? userService.createUser(ctx.from)
                && ctx.reply("Hello", option)
                : ctx.reply('Hello '
                + res.first_name + ' '
                + res.last_name, option);
        })
    });
}

