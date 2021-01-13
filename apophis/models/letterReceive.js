module.exports = (sequelize, DataTypes) => {
    return sequelize.define('LetterReceive', {
        LetterReceiveIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        
    }, {
        //모델의 옵션들을 지정하는곳 
        tableName: 'LETTER_RECEIVE_TB',  
        timestamps: false,

    });
};