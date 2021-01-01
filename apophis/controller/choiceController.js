const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

// 세화 블럭
const choiceService = require('../service/choiceService')

module.exports = {
    // 선택 창 종류와 그에 따른 스트링 값 내려주기
    readChat: async (req, res) => {
        try {
            const comments = await choiceService.getChoice();
            if (!comments) {
                console.log('comments 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "대화창 내용 조회 성공", comments));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },
}

