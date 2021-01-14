const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const {
    User,
    ChatDetails,
    Reply,
    ReplyWords
} = require('../models');
const replyService = require('../service/replyService');

module.exports = {
    //사용자 버킷리스트 전체 불러오기
    getAllBucket: async (req, res) => {
        
        const {UserIdx} = req.decoded

        try {
            const comments = await bucketService.getAllBucket(UserIdx);
            if (!comments) {
                console.log('버킷리스트가 비었습니다.');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "사용자 버킷리스트 조회 성공"));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },

}