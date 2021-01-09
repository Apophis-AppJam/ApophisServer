const { Reply, ReplyWords, Chat, ChatDetails,User } = require('../models');

module.exports = {
    
    getChatById: async ( chatDetailsIdx) => {
        try {
            
            const postInfo = await ChatDetails.findOne({
                where:{
                    
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: ['info','replyType']
            })
            const chat = await Chat.findAll({
                where : {
                    chatDetailsIdx: chatDetailsIdx,
                },
                attributes: ['text','nextAction'],
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

    getAllChat: async (day,token) => {
        try {
            const user = await User.findOne({
            where: {
                accessToken: token,
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
                }]
            })

            const userReply = await Reply.findAll({
                where: {
                    UserIdx: user.UserIdx,
                },
                attributes: ['ChatDetailsIdx', 'replyString', 'replyImage'],
                
                
            });
            console.log(userReply.replyImage)
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