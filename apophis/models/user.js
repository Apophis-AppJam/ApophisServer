module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {

        UserIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        snsId: {
            type: DataTypes.STRING(30),
            unique: false,
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(20),
            unique: false,
            allowNull: true,
        },
        userName: {
            type: DataTypes.STRING(10),
            unique: false,
            allowNull: true,
        },
        accessToken: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true,
        },
        refreshToken: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true,
        }

    }, {
        //모델의 옵션들을 지정하는곳   
        tableName: 'USER_TB',
        timestamps: true,

    });
};