module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Chat', {
        ChatIdx: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING(200),
            unique: false,
            allowNull: true,
            defaultValue: ''
        },
        nextAction: {
            type: DataTypes.STRING(40),
            unique: false,
            allowNull: true,
            defaultValue: ''
        }
        
    }, {
        //모델의 옵션들을 지정하는곳    
        tableName: 'CHAT_TB',
        timestamps: false,

    });
};