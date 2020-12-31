module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {

        UserIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING(10),
            unique: false,
            allowNull: false,
        },
        accessToken: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        }

    }, {
        //모델의 옵션들을 지정하는곳   
        tableName: 'USER_TB',
        timestamps: false,

    });
};