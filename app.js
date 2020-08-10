
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');
// connect to Mysql
const db = require('./database').getInstance();
db.setModels();

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
