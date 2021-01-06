module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Reply', {
        ReplyIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        replyString: {
            type: DataTypes.STRING(200),
            unique: false,
            allowNull: true,
            defaultValue: ''
        },
        replyImage: {
            type: DataTypes.STRING(200),
            unique: false,
            allowNull: true,
            defaultValue: ''
        },
        
    }, {
        //모델의 옵션들을 지정하는곳 
        tableName: 'REPLY_TB',  
        timestamps: true,

    });
};