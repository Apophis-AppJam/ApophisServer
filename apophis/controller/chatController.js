const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
//뒤 형식으로 모델 추가하기 const {User,Post,Class,} = require('../models');

// 세화 블럭
const chatService = require('../service/chatService')

module.exports = {
    // 아포니머스 채팅 내려주기 : 세화
    readChat: async (req, res) => {
        try {
            const comments = await chatService.getChatById();
            if (!comments) {
                console.log('comments 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "아포니머스 채팅 조회 성공", comments));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },
}