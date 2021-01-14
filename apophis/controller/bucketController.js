const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const bucketService = require('../service/bucketService');

module.exports = {
    //사용자 버킷리스트 전체 불러오기
    getAllBucket: async (req, res) => {
        
        const {UserIdx} = req.decoded

        try {
            const bucket = await bucketService.getAllBucket(UserIdx);
            if (!bucket) {
                console.log('버킷리스트가 비었습니다.');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "사용자 버킷리스트 조회 성공",bucket));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },
    postBucket: async (req, res) => {
        const {UserIdx} = req.decoded
        const {
            title,
            text,
            dDay,
        } = req.body;

        try {
            const bucket = await bucketService.postBucket(UserIdx,title,text,dDay);
            if (!bucket) {
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "버킷리스트 작성 성공"));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },
}