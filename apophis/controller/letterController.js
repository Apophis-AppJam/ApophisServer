const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

const letterService = require('../service/letterService')

module.exports = {
    /* 새 편지 조회  GET : [ /letter/new] */
    getLetter: async (req, res) => {
        const {UserIdx} = req.decoded
        try {
            const letters = await letterService.getLetter(UserIdx);
            if (!letters) {
                console.log('comments 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "익명의 지구인에게서 편지 받기 성공", letters));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },

    /* 받은 편지 조회  GET : [ /letter/view] */
    viewLetter: async (req, res) => {
        const {UserIdx} = req.decoded
        try {
            const letters = await letterService.viewLetter(UserIdx);
            if (!letters) {
                console.log('comments 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "받은 편지 조회 성공", letters));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },

    /* 편지 보내기  POST : [ /letter] */
    postLetter: async (req, res) => {
        const {UserIdx} = req.decoded
        const { text } = req.body;
        try {
            const letters = await letterService.postLetter(UserIdx, text);
            if (!letters) {
                console.log('comments 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "익명의 누군가에게 편지 보내기 성공"));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },

}