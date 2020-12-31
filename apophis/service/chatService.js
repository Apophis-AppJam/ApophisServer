const { Chat } = require('../models');

module.exports = {
    
    getChatById: async () => {
        try {
            const aponymousChat = await Chat.findAll({
                where : {
                    ChatIdx: 1,
                },
                attributes: ['ChatIdx', 'text', 'chatAction', 'chatView'],
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