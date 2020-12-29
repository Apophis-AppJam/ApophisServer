module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Choice', {

        list: {
            type: DataTypes.STRING(100),
            unique: false,
            allowNull: false,
        },
        
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true,
        timestamps: true,
    });
};