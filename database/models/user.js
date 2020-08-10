module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        is_bot:{
            type: DataTypes.BOOLEAN,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING
        },
        language_code:{
            type: DataTypes.STRING
        }


    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        tableName: 'user',
        timestamps: false
    });
};
