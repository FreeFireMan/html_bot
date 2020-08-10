// connect to googlesheet
const {client} = require("./../config/googleAPI");

module.exports = (bot)=>{
    bot.command('/update',
        ctx => {
            client.googleSheetUpdate()
            ctx.reply('update Questions')
        }
    )
}
