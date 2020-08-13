module.exports = (sequelize, DataTypes) => {
    return sequelize.define('rewards', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: DataTypes.INTEGER,
        },
        currentQuestion: {
            type: DataTypes.INTEGER,
        },
        answers: {
            type: DataTypes.INTEGER
        }

    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        tableName: 'rewards',
        timestamps: false
    });
};
