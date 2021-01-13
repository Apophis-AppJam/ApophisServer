const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

const letterService = require('../service/letterService')

module.exports = {
    /* 편지 조회  GET : [ /letter] */
    getLetter: async (req, res) => {
        try {
            const letters = await letterService.getLetter();
            if (!letters) {
                console.log('comments 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "익명의 누군가에게 온 편지 조회 성공", letters));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },

    // /* 아포니머스와 사용자의 일차별 전체 채팅 조회 GET : [/chat/day/:day] */
    // readChatAll: async (req, res) => {
    //     const day = req.params.day;
    //     const {UserIdx} = req.decoded
    //     try {
    //         const comments = await chatService.getAllChat(day, UserIdx);
    //         if (!comments) {
    //             console.log('CHAT 테이블이 비어있습니다');
    //             return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    //         }
    //         return res.status(sc.OK).send(ut.success(sc.OK, "아포니머스와 사용자의 일차별 전체 채팅 조회 성공", comments));
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    //     }
    // },

}