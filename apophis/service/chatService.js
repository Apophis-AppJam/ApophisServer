const { Chat } = require('../models');

module.exports = {
    
    getChatById: async () => {
        try {
            const aponymousChat = await Chat.findAll({
                where : {
                    ChatIdx: 1,
                },
                attributes: ['ChatIdx', 'text'],
            });
            return aponymousChat;
        } catch (error) {
            throw error;
        }
    },

}