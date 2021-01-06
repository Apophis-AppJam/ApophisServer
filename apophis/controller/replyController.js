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

    /* 채팅에 대한 응답  POST : [ /reply/:chatDetailsIdx/1] */
    getReply: async (req, res) => {
        const chatDetailsIdx = req.params.chatDetailsIdx;
        const token = req.headers.jwt;
        const {
            replyString,

        } = req.body;

        //const replyImage = req.file.location

        try {
            const user = await User.findOne({
                where: {
                    accessToken: token,
                }
            });

            const reply = await Reply.create({
                replyString,
                ChatDetailsIdx : chatDetailsIdx,
                //replyImage,
            });

            await user.addReply(reply);
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_REPLY_SUCCESS));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }
    },
    getImage: async (req, res) => {
        const chatDetailsIdx = req.params.chatDetailsIdx;
        const token = req.headers.jwt;
        const replyImage = req.file.location

        const {
            replyString,
        } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    accessToken: token,
                }
            });

            const reply = await Reply.create({
                replyString,
                replyImage,
                ChatDetailsIdx : chatDetailsIdx,
            });

            await user.addReply(reply);
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_IMAGE_SUCCESS));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }
    },
    
    getWords: async (req, res) => {
        const chatDetailsIdx = req.params.chatDetailsIdx;
        const token = req.headers.jwt;
        const {
            replyString,
            word1,
            word2,
            word3
        } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    accessToken: token,
                }
            });

            const reply = await Reply.create({
                replyString,
                ChatDetailsIdx : chatDetailsIdx,
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

            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_WORDS_SUCCESS));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }
    },

    /* 사용자 대답 입력 (스트링값 세개) POST : [/reply/:chatDetailsIdx/4] */
    getReplies: async (req, res) => {
        const chatDetailsIdx = req.params.chatDetailsIdx;
        const token = req.headers.jwt;
        const {
            replyString,
            reply1,
            reply2,
            reply3
        } = req.body;

        console.log(chatDetailsIdx);
        try {
            const comments = await replyService.getThreeReplies(chatDetailsIdx,replyString, reply1, reply2, reply3, token);
            if (!comments) {
                console.log('REPLY 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "사용자 대답 입력 (대답세개) 성공", comments));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },
}