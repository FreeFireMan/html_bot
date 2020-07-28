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
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },

    }, {
        tableName: 'post',
        timestamps: false
    });
};
