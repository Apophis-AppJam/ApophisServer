module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ChatDetails', {
        ChatDetailsIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        info: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        chatAction: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
        },
        chatView: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        replyNum: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        replyType: {
            type: DataTypes.STRING(40),
            allowNull: true,
        }
        
    }, {
        //모델의 옵션들을 지정하는곳  
        tableName:'CHAT_DETAILS_TB',
        timestamps: false,

    });
};