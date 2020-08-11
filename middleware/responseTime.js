module.exports = (bot)=>{
    bot.use(async (ctx, next) => {

        const start = new Date();
        // console.log(ctx);

        await next();
        const ms = new Date()- start;
        console.log('Response time: %sms',ms);
    })
}
