const { Reply, ReplyType, ChoiceWords, Chat, ChatDetails,User } = require('../models');

module.exports = {
    
    getChatById: async (chatDetailsIdx) => {
        try {
            const chat = await Chat.findAll({
                where : {
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: ['text','nextAction'],
            });
            const replyInfo = await ChoiceWords.findAll({
                where:{
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: ['choiceWords','nextChatDetailIdx'],
            })
            const replyType = await ChoiceWords.findOne({
                where:{
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: [],
                include: [{
                    model: ReplyType,
                    attributes: ['ReplyTypeIdx', 'text']
                }],
            })

            const aponymousChat = ({
                chat,
                replyTypeIdx: replyType.dataValues.Reply_Type.ReplyTypeIdx,
                replyType: replyType.dataValues.Reply_Type.text,
                replyInfo
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