const { ChoiceWords, ChatDetails } = require('../models');

module.exports = {
    
    getChoice: async (chatActionId) => {
        try {
            const aponymousChat = await ChatDetails.findOne({
                where : {
                    ChatDetailsIdx : chatActionId
                },
                attributes: ['info', 'day', 'replyNum'],
    
                include: [{
                    model: ChoiceWords,
                    attributes: ['choiceWords']
                }]
            });
            return aponymousChat;
        } catch (error) {
            throw error;
        }
    },
}