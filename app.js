
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');
// connect to Mysql
const db = require('./database').getInstance();
db.setModels();

//commands
const {launch,start,update} = require('./commands');
//middleware
const {responseTime} = require('./middleware');
//hears
const {startHears} = require('./hears');


//middleware
responseTime(bot);

//commands
start(bot);
update(bot);

startHears(bot);

bot.on('contact',ctx => {
    console.log("ctx.update.message.contact");
    console.log(ctx.update.message.contact);
})


try {
    launch(bot);
}catch (e) {
    console.log(e);
}
