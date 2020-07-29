

const Sequelize = require('sequelize');
const fs = require('fs');
const {resolve} = require('path');

module.exports = ( () => {
    let instance;

     function initConnection() {
        const client = new Sequelize(process.env.DBNAME, process.env.DBLOGIN, process.env.DBPASSWORD, {
            host: 'localhost',
            dialect: 'mysql',
            query : {query:`CREATE DATABASE IF NOT EXISTS "${process.env.DBNAME}"`}
            // logging: console.log,                  // Default, displays the first parameter of the log function call
            // logging: (...msg) => console.log(msg), // Displays all log function call parameters

        });
        const database = process.env.DBNAME;
        // console.log(`Creating database "${database}"...`);
        // client.query(`CREATE DATABASE IF NOT EXISTS "${database}"`).then(() => console.log('Database created'));


        const models = {};

        function getModels() {
            fs.readdir('./database/models', (err, file) => {

                file.forEach(file => {
                    const modelName = file.split('.')[0];

                    // models[modelName] = client.import(resolve(`./database/models/${modelName}`))
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
