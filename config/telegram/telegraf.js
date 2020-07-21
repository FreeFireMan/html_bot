// Створення бота через бібліотеку "Телеграф", встановлення токену

const Telegraf = require('telegraf');
const token = process.env.TOKENTGBOT;
const bot = new Telegraf(token);

module.exports = {
    bot
};
