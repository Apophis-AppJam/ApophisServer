const { Chat } = require('../models');

module.exports = {
    
    getChatById: async () => {
        try {
            const aponymousChat = await Chat.findAll({
                where : {
                    id: 1,
                },
                attributes: ['id', 'text', 'chatAction', 'chatView', 'day', 'createdAt'],
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