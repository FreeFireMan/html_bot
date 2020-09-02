// connect to googlesheet
// const {google:{client}} = require("./../config");
const {roleService} = require('./../service');

module.exports = (bot)=>{
  bot.command('/createRole',
      ctx => {
        console.log(ctx.message.text.split(' ').pop());
        let role = ctx.message.text.split(' ').pop()
        if(role.length > 0)
        roleService.createRole(role)
            .then((res) => {
              res
              ? ctx.reply('role created ' + role)
                  : ctx.reply('role not created ' + role)
            })
        ctx.reply('end create role')
      }
  )
}
