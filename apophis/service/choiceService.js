const { ChoiceWords, ChatDetails } = require('../models');

module.exports = {
    
    getChoice: async () => {
        try {
            const aponymousChat = await ChatDetails.findAll({
                // where : {
                //     ChoiceWordsIdx: 1,
                // },
                attributes: ['ChatDetailsIdx', 'info', 'chatAction', 'chatView'],
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