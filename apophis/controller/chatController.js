const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
//뒤 형식으로 모델 추가하기 const {User,Post,Class,} = require('../models');

const chatService = require('../service/chatService')

module.exports = {
    /* 아포니머스 채팅 조회  GET : [ /chat/:chatDetailsIdx] */
    readChat: async (req, res) => {
        const day = req.params.day;
        const token = req.headers.jwt;
        const chatDetailsIdx = req.params.chatDetailsIdx;
        try {
            const comments = await chatService.getChatById(chatDetailsIdx,token);
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

    /* 아포니머스와 사용자의 일차별 전체 채팅 조회 GET : [/chat/day/:day] */
    readChatAll: async (req, res) => {
        const day = req.params.day;
        const token = req.headers.jwt;
        try {
            const comments = await chatService.getAllChat(day,token);
            console.log(token)
            if (!comments) {
                console.log('CHAT 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "아포니머스와 사용자의 일차별 전체 채팅 조회 성공", comments));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },

}