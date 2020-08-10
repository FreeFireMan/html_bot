const Sequelize = require('sequelize');
// const mysql = require('mysql2');
const fs = require('fs');
const {resolve} = require('path');
const {DB} = require('../config');

module.exports = (() => {
  let instance;


  function initConnection() {
    // const connection = mysql.createConnection({
    //   host: DB.HOST,
    //   user: DB.USER,
    //   password: DB.PASSWORD,
    //   database: DB.DIALECT,
    // });
    //
    // const res = connection.query(`CREATE DATABASE IF NOT EXISTS ${DB.NAME}`)

    const sequelize = new Sequelize(
        DB.NAME,
        DB.USER,
        DB.PASSWORD,
        {
          host: DB.HOST,
          dialect: DB.DIALECT,
          // logging: console.log,                  // Default, displays the first parameter of the log function call
          // logging: (...msg) => console.log(msg), // Displays all log function call parameters
        }
    );

    const models = {};
    fs.readdir('./database/models', (err, file) => {

      file.forEach(file => {
        const modelName = file.split('.')[0];
        require(resolve(`./database/models/${modelName}`))(sequelize, Sequelize.DataTypes);
      })
    })

    function getModels() {
        fs.readdir('./database/models', (err, file) => {

            file.forEach(file => {
                const modelName = file.split('.')[0];
                models[modelName] = require(resolve(`./database/models/${modelName}`))(sequelize, Sequelize.DataTypes);
                models[modelName].sync(); //create if not exist
                // console.log(models);
            })
        })

    }

    return {
       setModels: () => getModels(),
      getModel: (modelName) =>  sequelize.models[modelName],
    }
  }

  return {
    getInstance:  () => {
      if (!instance) {
        instance =  initConnection();

      }
       // instance.setModels();
      return instance;
    }
  }
})();
