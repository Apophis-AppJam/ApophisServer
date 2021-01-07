const { Reply, ReplyWords, User } = require('../models');

module.exports = {
    
    getAudio: async (chatDetailsIdx, replyAudio, token) => {
        try {
            const user = await User.findOne({
                where: {
                    accessToken: token,
                }
            });
            const reply = await Reply.create({
                replyImage: replyAudio,
                ChatDetailsIdx : chatDetailsIdx,
            })

            await user.addReply(reply);

            return reply;
        } catch (error) {
            throw error;
        }
    },

    getThreeReplies: async (chatDetailsIdx, replyString, reply1, reply2, reply3, token) => {
        try {
            const user = await User.findOne({
                where: {
                    accessToken: token,
                }
            });

            const reply = await Reply.create({
                replyString,
                ChatDetailsIdx : chatDetailsIdx,
            })

            const firstReply = await Reply.create({
                replyString: reply1,
                ChatDetailsIdx : chatDetailsIdx,

            })
            const secondReply = await Reply.create({
                replyString: reply2,
                ChatDetailsIdx : chatDetailsIdx,

            })
            const thirdReply = await Reply.create({
                replyString: reply3,
                ChatDetailsIdx : chatDetailsIdx,

            })

            await user.addReply(reply);
            await user.addReply(firstReply);
            await user.addReply(secondReply);
            await user.addReply(thirdReply);
            const response = [
                reply.replyString,
                firstReply.replyString,
                secondReply.replyString,
                thirdReply.replyString
            ]

            return response;
        } catch (error) {
            throw error;
        }
    },


    

}