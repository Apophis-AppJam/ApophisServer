module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Chat', {

        text: {
            type: DataTypes.STRING(200),
            unique: false,
            allowNull: true,
        },
        chatAction: {
            type: DataTypes.INTEGER(),
            unique: false,
            allowNull: true,
        },
        chatView: {
            type: DataTypes.STRING(100),
            unique: false,
            allowNull: true,
        },
        day: {
            type: DataTypes.INTEGER(),
            unique: false,
            allowNull: false,
        },
        
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true,
        timestamps: true,
    });
};