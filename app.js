require('dotenv').config();
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');
//commands
const {launch,start,update} = require('./commands');
//middleware
const {responseTime} = require('./middleware');
//hears
const {startHears} = require('./hears');
//bot on
const {contact} = require('./bot_ons');

//middleware
responseTime(bot);

//commands
start(bot);
update(bot);
//hears
startHears(bot);

//bot_on
contact(bot)

try {
    launch(bot);
}catch (e) {
    console.log(e);
}
