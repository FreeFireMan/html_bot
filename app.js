require('dotenv').config();
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');
//commands
const {launch,start,update,createRole} = require('./commands');
//middleware
const {responseTime} = require('./middleware');
//hears
const {startHears} = require('./hears');
//bot on
const {contact,image} = require('./bot_ons');

//middleware
responseTime(bot);

//commands
start(bot);
update(bot);
createRole(bot)

//hears
startHears(bot);

//bot_on
contact(bot)
image(bot)

try {
    launch(bot);
}catch (e) {
    console.log(e);
}
