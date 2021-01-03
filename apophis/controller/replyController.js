const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
//뒤 형식으로 모델 추가하기 const {User,Post,Class,} = require('../models');
const {
    User,
    ChatDetails,
    Reply,
    ReplyWords
} = require('../models');
module.exports = {

    getReply: async (req, res) => {
        const chatAction = req.params.chatAction;

        const {
            UserIdx,
            replyString,

        } = req.body;

        //const replyImage = req.file.location

        try {
            const user = await User.findOne({
                where: {
                    UserIdx: UserIdx,
                }
            });

            const reply = await Reply.create({
                replyString,
                //replyImage,
                chatAction,
            });

            await user.addReply(reply);
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_SUCCESS, reply));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }
    },
    getImage: async (req, res) => {
        const chatAction = req.params.chatAction;
        const replyNum = req.params.replyNum;

        const replyImage = req.file.location

        const {
            UserIdx,
            replyString,

        } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    UserIdx: UserIdx,
                }
            });

            const reply = await Reply.create({
                replyString,
                replyImage,
                chatAction,
            });

            await user.addReply(reply);
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_SUCCESS, reply));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }
    },
    getWords: async (req, res) => {
        const chatAction = req.params.chatAction;

        const {
            UserIdx,
            replyString,
            word1,
            word2,
            word3
        } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    UserIdx: UserIdx,
                }
            });

            const reply = await Reply.create({
                replyString,
                chatAction,
            })

            const words1 = await ReplyWords.create({
                words: word1,

            })
            const words2 = await ReplyWords.create({
                words: word2,

            })
            const words3 = await ReplyWords.create({
                words: word3,

            })

            await user.addReply(reply);
            await reply.addReplyWords(words1);
            await reply.addReplyWords(words2);
            await reply.addReplyWords(words3);

            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_SUCCESS, reply));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }
    },
}