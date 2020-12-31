module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Reply', {

        replyString: {
            type: DataTypes.STRING(200),
            unique: false,
            allowNull: true,
        },
        replyImage: {
            type: DataTypes.STRING(100),
            unique: false,
            allowNull: true,
        },
        replyWords: {
            type: DataTypes.STRING(100),
            unique: false,
            allowNull: true,
        },
        
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true,
        timestamps: true,
    });
};