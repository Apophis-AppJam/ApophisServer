const { Reply, ReplyWords, Chat, ChatDetails } = require('../models');

module.exports = {
    
    getChatById: async ( chatDetailsIdx) => {
        
        try {
            const postInfo = await ChatDetails.findOne({
                where:{
                    
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: ['info']
            })
            const chat = await Chat.findAll({
                where : {
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: ['text'],
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