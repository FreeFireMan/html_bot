
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');
const database = require('./database').getInstance();
// database.setModels();
const {client} = require("./config/googleAPI");


// console.log(googleSheets);
// googleSheets.spreadsheets.values.get({
//     spreadsheetId: '1y269rVxBoQI1IgjfV4yTxpaUiPn2UxsdmGoGRSx9ah4',
//     range: 'A1:E1000',
// }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     // console.log(res);
//     const rows = res.data.values;
//     if (rows.length) {
//         // console.log('Name, Major:');
//         // Print columns A and E, which correspond to indices 0 and 4.
//         rows.forEach((row) => {
//             if (row[0] === 'id') {return}
//              console.log(row);
//             postService.createPost({
//                 id:row[0],
//                 priority: row[1] || 99999,
//                 title: row[2],
//                 body: row[3],
//                 image: row[4],
//             })
//         });
//     } else {
//         console.log('No data found.');
//     }
// });









bot.command('/update',
    ctx => {
        const googleSheets =   client.apiStart()
        console.log("googleSheets")
        console.log(googleSheets)
    ctx.reply('update Questions')
    }
    )

try {
    bot.launch({polling: {}})
        .then(() => console.log('Bot is started...'))
        .catch(reason => console.log(`Error in app js on start bot\n${reason}`));
}catch (e) {
    console.log(e);
}
