const { Chat, ChatDetails } = require('../models');

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

    // getNewCreators: async () => {
    //     try {
    //         const creators = await Creator.findAll({
    //             where: {
    //                 ifNew: 1,
    //             },
    //             attributes: ['profileUrl'],
    //         });
    //         return creators;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}