
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');
// connect to Mysql
require('./database').getInstance();

//commands
const {launch,start,update} = require('./commands');
//middleware
const {responseTime} = require('./middleware');

//middleware
responseTime(bot);

//commands
start(bot);
update(bot);



try {
    launch(bot);
}catch (e) {
    console.log(e);
}
