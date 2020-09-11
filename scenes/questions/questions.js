// Сцена для
const {userService} = require('./../../service');
const role = require('./../../constants').USERROLES

const WizardScene = require('telegraf/scenes/wizard');

const questions = new WizardScene(
    'questions',
    firstStep,
    secondStep,

);

questions.leave(async (ctx) =>
    await ctx.reply('Вихід з 🐾 /questions'),
);

async function firstStep(ctx) {
    try {
        const user = await userService.getUser(ctx.from.id)
        console.log(user);
        if (user.role.role === role.CONTENT) {
            ctx.reply('You areallowed')
            return ctx.wizard.next()
        } else {
            ctx.reply('You are not allowed')
            await ctx.scene.leave();
        }
    } catch (e) {
        console.log(`My error in scenes_addImages_1\n${e.message}`);
    }
}
async function secondStep(ctx) {
    try {
        ctx.reply('You areallowed@')
        await ctx.scene.leave();
    } catch (e) {
        console.log(`My error in scenes_addImages_1\n${e.message}`);
    }
}

//
// async function acceptNewPerson(ctx) {
//     try {
//         if (ctx.update.callback_query.data === 'phone') {
//             try {
//                 ctx.session.typeOfRegistraion = 'phone';
//                 const {callbackQuery, tg} = ctx;
//                 const {message} = callbackQuery;
//                 const messageId = message.message_id;
//                 await tg.deleteMessage(message.chat.id, messageId);
//                 await ctx.reply('Напишіть номер телефону користувача,' +
//                     ' щоб надати йому змогу користуватись ботом 🙈');
//                 return ctx.wizard.next();
//             } catch (e) {
//                 console.log(`My error in scenes_adminaddScene_2\n${e.message}`);
//             }
//         }
//
//         if (ctx.update.callback_query.data === 'username') {
//             try {
//                 ctx.session.typeOfRegistraion = 'username';
//                 const {callbackQuery, tg} = ctx;
//                 const {message} = callbackQuery;
//                 const messageId = message.message_id;
//                 await tg.deleteMessage(message.chat.id, messageId);
//                 await ctx.reply('Напишіть псевдонім користувача,' +
//                     ' щоб надати йому змогу користуватись ботом 🙈');
//                 return ctx.wizard.next();
//             } catch (e) {
//                 console.log(`My error in scenes_adminaddScene_3\n${e.message}`);
//             }
//         }
//
//         if (ctx.update.callback_query.data === 'cancel') {
//             try {
//                 await ctx.reply('Скасовано!');
//                 await ctx.scene.leave();
//             } catch (e) {
//                 console.log(`My error in scenes_adminaddScene_4\n${e.message}`);
//             }
//         }
//     } catch (e) {
//         console.log(`My error in scenes_adminaddScene_5\n${e.message}`);
//         await ctx.reply('Скасовано!');
//         await ctx.scene.leave();
//     }
// }
//
// async function registerNewPerson(ctx) {
//     try {
//         if (ctx.session.typeOfRegistraion === 'phone') {
//             try {
//                 const phoneNumber = ctx.update.message.text
//                     .replace('+', '')
//                     .replace(new RegExp(' ', 'g'), '');
//
//                 const check = await validPhoneNumber(phoneNumber);
//
//                 if (!check.error) {
//                     const result =
//                         await createOneByKeyValue('phone_number', phoneNumber, 'user');
//                     if (result) {
//                         await ctx.reply(`Користувач за номером телефону` +
//                             ` ${phoneNumber} добавлений 😉`);
//                     } else {
//                         await ctx.reply('Виникла помилка 🤔');
//                     }
//                     await ctx.scene.leave();
//                 } else {
//                     await ctx.reply(`Перевірте номер телефону на` +
//                         ` ${check.msg} і спробуйте ще раз`);
//                     ctx.scene.reenter();
//                 }
//             } catch (e) {
//                 console.log(`My error in scenes_adminaddScene_6\n${e.message}`);
//             }
//         } else if (ctx.session.typeOfRegistraion === 'username') {
//             try {
//                 const username = ctx.update.message.text.replace('@', '');
//
//                 const check = await validUserName(username);
//
//                 if (!check.error) {
//                     const result =
//                         await createOneByKeyValue('username', username, 'user');
//                     if (result) {
//                         await ctx.reply(`Користувач за псевдонімом`+
//                             ` @${username} добавлений 😉`);
//                     } else {
//                         await ctx.reply('Виникла помилка 🤔');
//                     }
//                     await ctx.scene.leave();
//                 } else {
//                     await ctx.reply(`Перевірте псевдонім на`+
//                         ` ${check.msg} і спробуйте ще раз`);
//                     await ctx.scene.reenter();
//                 }
//             } catch (e) {
//                 console.log(`My error in scenes_adminaddScene_7\n${e.message}`);
//             }
//         } else {
//             await ctx.reply('Виникла помилка 🤔');
//             await ctx.scene.leave();
//         }
//     } catch (e) {
//         console.log(`My error in scenes_adminaddScene_8\n${e.message}`);
//     }
// }

const {stage} = require('../../config/stage/stages');
stage.register(questions);

module.exports = stage;
