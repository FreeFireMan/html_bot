const db = require('./models');

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

       const init = (async (db) => {
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
