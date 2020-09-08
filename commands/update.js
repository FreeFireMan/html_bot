// connect to googlesheet
const {google:{client}} = require("./../config");

module.exports = (bot)=>{
    bot.command('/update',
        ctx => {
            client.googleSheetUpdate()

            ctx.reply('update Questions')
        }
    )
}
