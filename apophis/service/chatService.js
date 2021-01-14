const { Reply, ReplyWords, Chat, ChatDetails,User } = require('../models');

module.exports = {
    
    getChatById: async (chatDetailsIdx) => {
        try {
            const postInfo = await ChatDetails.findOne({
                where:{
                    
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: ['replyNum','replyType']
            })
            const chat = await Chat.findAll({
                where : {
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: ['text','nextAction'],
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

    getAllChat: async (day, UserIdx) => {
        try {
            const user = await User.findOne({
            where: {
                UserIdx
            },
            attributes: ['UserIdx']
            });

            const aponymousChat = await ChatDetails.findAll({
                where:{
                    day: day,
                },
                attributes: ['ChatDetailsIdx'],
                include: [{
                    model: Chat,
                    attributes: ['text']
                },
            ]
            })
            const userReply = await ChatDetails.findAll({
                where:{
                    day: day,
                },
                attributes: ['ChatDetailsIdx'],
                include: [
                {
                    model: Reply,
                    where: {
                        UserIdx: user.UserIdx,
                    },
                    attributes: ['replyString', 'replyFile']
                }]
            })
            const chatReply = ({
                aponymousChat,
                userReply
            });
            return chatReply;
        } catch (error) {
            throw error;
        }
    },

}