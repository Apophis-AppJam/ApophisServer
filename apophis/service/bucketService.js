const {
    Reply,
    ReplyWords,
    User
} = require('../models');

module.exports = {

        getAllBucket: async (UserIdx) => {
            try {
                const bucket = await User.findOne({
                    where: {
                        UserIdx,
                    }
                })
                const bucket = await BucketList.findAll({
                    where: {
                        UserIdx
                    },
                    attributes: ['text', 'nextAction'],
                });
                const aponymousChat = ({
                    chat,
                    postInfo
                });
                return aponymousChat;
            } catch (error) {
                throw error;
            }
        },

}