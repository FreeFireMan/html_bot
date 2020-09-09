const {fsService} = require('./../service');

module.exports = (bot) => {
    bot.command('/add_images', ctx => {
        fsService.addImages()
    })
}

