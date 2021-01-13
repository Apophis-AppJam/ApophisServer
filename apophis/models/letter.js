module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Letter', {
        LetterIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.TEXT,
            unique: false,
            allowNull: true,
            defaultValue: '',
        }
        
    }, {
        //모델의 옵션들을 지정하는곳 
        tableName: 'LETTER_TB',  
        timestamps: true,

    });
};