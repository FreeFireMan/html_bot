const Sequelize = require('sequelize');
// const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
const {resolve} = require('path');

const config = require(__dirname+'/config/config.js');
console.log(config);

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
          config.development.database,
          config.development.username,
          config.development.password,
          {
              host:config.development.host,
              dialect:config.development.dialect
          },
          config

    );

    const models = {};

    function getModels() {
        // fs.readdir('./database/models', (err, file) => {
        //     console.log("file");
        //     console.log(file);
        //     file.forEach(file => {
        //         const modelName = file.split('.')[0];
        //         models[modelName] = require(resolve(`./database/models/${modelName}`))(sequelize, Sequelize.DataTypes);
        //         models[modelName].sync(); //create if not exist
        //         console.log(models);
        //     })
        //     Object.keys(models).forEach(modelName => {
        //         console.log("modelName");
        //         console.log(models[modelName]);
        //     })
        // })

        console.log(path.join(__dirname,'models'))
        const myPath = path.join(__dirname,'models')

        fs.readdirSync(myPath)
            .filter(file =>{
                return (file.indexOf(".") !== 0) && (file !== "index.js");
            })
            .forEach(async file=>{
                let model = require(resolve(myPath+`/${file}`))(sequelize, Sequelize.DataTypes);
                // models[model.name] = model.sync();
                models[model.name] = await model.sync();
            })

            Object.keys(models).forEach(function(modelName) {
                console.log('Object.keys');
                console.log(models[modelName]);
                if (models[modelName].associate) {
                    // models[modelName].associate(models);
                    console.log('itworket',models[modelName]);
                    models[modelName].associate(models)
                }
            });
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
