const {
    BucketList,
    User
} = require('../models');
var moment = require('moment')

module.exports = {

    getAllBucket: async (UserIdx) => {
        try {

            const bucket = await BucketList.findAll({
                where: {
                    UserIdx
                },
                attributes: ['BucketListIdx', 'title', 'text', 'dDay','createdAt'],
        
                
            });
            
            const format1 = 'YYYY/MM/DD';

            bucket.map((item, index) => {
                item.dataValues.dDayLeft = item.dataValues.dDay-moment().diff(moment(item.dataValues.createdAt).format(format1),'days')
                delete item.dataValues.createdAt
                delete item.dataValues.dDay
                
            })
            
            return bucket;
        } catch (error) {
            throw error;
        }
    },

    postBucket: async (UserIdx, title, text, dDay) => {
        try {
            const user = await User.findOne({
                where: {
                    UserIdx,
                }
            });

            const bucket = await BucketList.create({
                title :title,
                text:text,
                dDay:dDay,
            })
            
            await user.addBucketList(bucket);
            return bucket
        } catch (error) {
            throw error;
        }
    },

}