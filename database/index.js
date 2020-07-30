
const Sequelize = require('sequelize');
const mysql = require('mysql2');
const fs = require('fs');
const {resolve} = require('path');

module.exports = ( () => {
    let instance;

    const connection = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBLOGIN,
        password: process.env.DBPASSWORD,
        database: process.env.DBDIALECT,
    });

    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DBNAME}`);

     function initConnection() {
        const client = new Sequelize(
            process.env.DBNAME,
            process.env.DBLOGIN,
            process.env.DBPASSWORD,
            {
                host: process.env.DBHOST,
                dialect: process.env.DBDIALECT,
            // logging: console.log,                  // Default, displays the first parameter of the log function call
            // logging: (...msg) => console.log(msg), // Displays all log function call parameters
            }
        );

        const models = {};

        function getModels() {
            fs.readdir('./database/models', (err, file) => {

                file.forEach(file => {
                    const modelName = file.split('.')[0];
                    models[modelName] = require(resolve(`./database/models/${modelName}`))(client, Sequelize.DataTypes);
                    models[modelName].sync(); //create if not exist
                    console.log(models);
                })
            })

        }

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    }
})();
