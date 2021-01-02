const { ChoiceWords, ChatDetails } = require('../models');

module.exports = {
    
    getChoice: async (day, chatActionId) => {
        try {
            const aponymousChat = await ChatDetails.findAll({
                where : {
                    day: day,
                    chatAction : chatActionId
                },
                attributes: ['ChatDetailsIdx', 'info', 'chatAction', 'chatView', 'day'],
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