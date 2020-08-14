module.exports = (sequelize, DataTypes) => {
    return sequelize.define('roles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role:{
            type: DataTypes.STRING,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        tableName: 'roles',
        timestamps: false
    });
};
