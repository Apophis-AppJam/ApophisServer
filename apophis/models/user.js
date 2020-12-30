module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {

        userID: {
            type: DataTypes.STRING(20),
            unique: false,
            allowNull: false,
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
        freezeTableName: true,
        timestamps: false,
    });
};