
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');

// connect to Mysql
const db = require('./database/models');
async function f (db){
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
f(db);
// db.setModels();
console.log('process.env.NODE_ENV');
console.log(process.env.NODE_ENV);

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
