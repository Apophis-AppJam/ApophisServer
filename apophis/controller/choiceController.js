const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

// 세화 블럭
const choiceService = require('../service/choiceService')

module.exports = {
    
    /* 대화창 상세 조회  GET : [ /choice/:day/:chatDetailsId] */
    readChat: async (req, res) => {
        const day = req.params.day;
        const chatActionId = req.params.chatActionId;
        console.log(day)
        try {
            const comments = await choiceService.getChoice(day, chatActionId);
            if (!comments) {
                console.log('Choice 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "대화창 상세 조회 성공", comments));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },
}
