
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');

const database = require('./database').getInstance();

const {client} = require("./config/googleAPI");
 // client.googleApi();




bot.command('/hello',
    ctx => {
    ctx.reply('Hello World')
    }
    )

try {
    bot.launch({polling: {}})
        .then(() => console.log('Bot is started...'))
        .catch(reason => console.log(`Error in app js on start bot\n${reason}`));
}catch (e) {
    console.log(e);
}
