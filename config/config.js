require('dotenv').config();
module.exports = {
    TG:{
        TOKEN :  process.env.TOKENTGBOT
    },
    DB:{
        NAME : process.env.DBNAME,
        LOGIN : process.env.DBLOGIN,
        PASS : process.env.DBPASSWORD,
        HOST : process.env.DBHOST,
        DIALECT : process.env.DBDIALECT,
    },
    GOOGLE:{
        SPREADSHEETID: process.env.SPREADSHEETID
    }
}
