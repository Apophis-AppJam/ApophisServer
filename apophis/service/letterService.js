const { Reply, User, Letter } = require('../models');
const sequelize = require('sequelize');

module.exports = {
    
    getLetter: async () => {
        try {
            const letter = await Letter.findAll({
                // 랜덤으로 리턴해주는 로직 추가하기
                order: [
                    [sequelize.literal('RAND()')]
                  ],
                  limit: 1,
                attributes: ['text']
                
            })
            return letter;
        } catch (error) {
            throw error;
        }
    },

    postLetter: async (UserIdx, text) => {
        try {
            const user = await User.findOne({
                where: {
                    UserIdx,
                }
            });
            
            const letter = await Letter.create({
                text: text
            })

            await user.setLetter(letter)
            return letter;
        } catch (error) {
            throw error;
        }
    },
}