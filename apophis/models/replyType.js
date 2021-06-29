module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Reply_Type', {
        ReplyTypeIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING(200),
            unique: false,
            allowNull: true,
            defaultValue: ''
        }
        
    }, {
        //모델의 옵션들을 지정하는곳 
        tableName: 'REPLY_TYPE_TB',  
        timestamps: false,

    });
};