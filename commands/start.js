const {userService} = require('./../service');
module.exports = (bot) =>{
    bot.start(ctx => {
        console.log(ctx.from);
        userService.getUser(ctx.from.id).then(res => {
            !res
            ? userService.createUser(ctx.from)
                &&ctx.reply("Hello, World!")
                : ctx.reply('Hello '
                +res.dataValues.first_name+' '
                +res.dataValues.last_name);
        })

    });
}

