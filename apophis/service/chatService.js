const { Reply, ReplyWords, Chat, ChatDetails } = require('../models');

module.exports = {
    
    getChatById: async (day, chatDetailsIdx) => {
        try {
            const plusReply = await ChatDetails.findOne({
                where:{
                    day: day,
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: ['replyNum','info','chatAction']
            })
            const chat = await Chat.findAll({
                where : {
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: ['ChatIdx', 'text'],
            });
            const aponymousChat = ({
                chat,
                plusReply
            });
            return aponymousChat;
        } catch (error) {
            throw error;
        }
    },

    getAllChat: async (day) => {
        try {
            const aponymousChat = await ChatDetails.findAll({
                where:{
                    day: day,
                },
                attributes: ['ChatDetailsIdx'],
                include: [{
                    model: Chat,
                    attributes: ['text']
                }]
            })
            const userReply = await Reply.findAll({
                // where : {
                //     chatDetailsIdx: chatDetailsIdx,
                // },
                attributes: ['ChatDetailsIdx', 'replyString', 'replyImage'],
                include: [{
                    model: ReplyWords,
                    attributes: ['words']
                }]
            });
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