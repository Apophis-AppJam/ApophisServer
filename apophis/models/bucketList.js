module.exports = (sequelize, DataTypes) => {
    return sequelize.define('BucketList', {
        BucketListIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            unique: false,
            allowNull: true,
            defaultValue: ''
        },
        text: {
            type: DataTypes.TEXT,
            unique: false,
            allowNull: true,
            defaultValue: ''
        },
        dDay: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: true,
            defaultValue: 0
        }
        
    }, {
        //모델의 옵션들을 지정하는곳 
        tableName: 'BUCKET_LIST_TB',  
        timestamps: true,

    });
};