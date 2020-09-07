const db = require('./models');
// const mysql = require('mysql2');

module.exports = (() => {
    let instance;

    function initConnection() {
        // const connection = mysql.createConnection({
        //   host: process.env.DB_HOST,
        //   user: process.env.DB_USER,
        //   password: process.env.DB_PASSWORD,
        //   database: process.env.DB_NAME,
        // });
        //
        // const res = connection.query(`CREATE DATABASE IF NOT EXISTS ${DB.NAME}`)
       (async (db) => {
            try {
                await db.sequelize.authenticate();
                await db.sequelize.sync();
                console.log('Connection has been established successfully.');
            } catch (error) {
                console.error('Unable to connect to the database:', error);
            }

        })(db)
        return {
            getDB: () => db,
            getModel: (modelName) => db[modelName],
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }
            // instance.setModels();
            return instance;
        }
    }
})();
