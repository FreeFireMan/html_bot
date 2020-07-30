module.exports = (sequelize, DataTypes) => {
    return sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        priority: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },

    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        tableName: 'post',
        timestamps: false
    });
};
