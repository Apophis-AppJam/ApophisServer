module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ReplyWords', {
        ReplyWordsIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        words: {
            type: DataTypes.STRING(100),
            unique: false,
            allowNull: true,
        }
        
    }, {
        //모델의 옵션들을 지정하는곳  
        tableName: 'REPLY_WORDS_TB' ,
        timestamps: false,

    });
};