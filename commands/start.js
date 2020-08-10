module.exports = (bot) =>{
    bot.start(ctx => {
        console.log(ctx.update.message.from);
        ctx.reply('Hello World!');
    });
}

