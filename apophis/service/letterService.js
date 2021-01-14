const { Reply, User, Letter, LetterReceive} = require('../models');
const sequelize = require('sequelize');

module.exports = {
    
    getLetter: async (UserIdx) => {
        try {
            const user = await User.findOne({
                where: {
                    UserIdx,
                }
            });

            const letter = await Letter.findOne({
                // 랜덤으로 리턴해주는 로직 추가하기
                order: [
                    [sequelize.literal('RAND()')]
                  ],
                  limit: 1,
                attributes: ['LetterIdx', 'text'],
                 
            });

            // 받은 편지 디비에 등록해주기
            const newLetter = await LetterReceive.create({
                LetterIdx: letter.LetterIdx
            })
            await user.setLetterReceive(newLetter)

            return letter;
        } catch (error) {
            throw error;
        }
    },

    viewLetter: async (UserIdx) => {
        try {
            const letterView = await LetterReceive.findOne({
                where : {
                    UserIdx : UserIdx
                },
                attributes: ['LetterIdx'],
    
                include: [{
                    model: Letter,
                    attributes: ['text']
                }]
            });

            // const newConst = LetterReceive.map((item, index) => {
            //     item.dataValues.LetterIdx = letterView.dataValues.LetterIdx
            //     item.dataValues.test = letterView.Letter.text
            // }) 
            return letterView;
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
            });

            const letterReceive = await LetterReceive.create({
                LetterIdx: letter.LetterIdx
            });

            await user.setLetter(letter)
            return letter;
        } catch (error) {
            throw error;
        }
    },
}