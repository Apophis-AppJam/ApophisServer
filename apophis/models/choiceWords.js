module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ChoiceWords', {
        ChoiceWordsIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        choiceWords: {
            type: DataTypes.STRING(100),
            unique: false,
            allowNull: true,
        }
        
    }, {
        //모델의 옵션들을 지정하는곳 
        tableName: 'CHOICE_WORDS_TB',   
        timestamps: false,

    });
};