const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
//뒤 형식으로 모델 추가하기 const {User,Post,Class,} = require('../models');
const {Chat} = require('../models');
module.exports = {
    readChats: async (req, res) => {
        try {
            const posts = await Chat.findAll({

                where:{
                    day :1
                    
                }
                });
            return res
                .status(sc.OK)
                .send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, posts));
        } catch (err) {
            console.log(err);
            return res
                .status(sc.INTERNAL_SERVER_ERROR)
                .send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_POST_ALL_FAIL));
        }
    },
}