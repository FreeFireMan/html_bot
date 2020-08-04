require('dotenv').config();

module.exports = {

  DB:{
    NAME: process.env.DB_NAME || 'noname',
    HOST: process.env.DB_HOST || 'localhost',
    DIALECT: process.env.DB_DIALECT || 'mysql',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'root',
  },


  TG:{
    TOKEN: process.env.TG_TOKEN
  } ,
};
