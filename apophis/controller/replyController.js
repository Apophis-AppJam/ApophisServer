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

    /* 사용자 대답 입력 (스트링값 한개) POST : [/reply/:chatDetailsIdx/1] */
    getReply: async (req, res) => {
        const {UserIdx} = req.decoded
        const chatDetailsIdx = req.params.chatDetailsIdx;
        const {
            replyString,

        } = req.body;

        //const replyImage = req.file.location

        try {
            const user = await User.findOne({
                where: {
                    UserIdx
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

    /* 사용자 대답 입력 (이미지 + 스트링 한개) POST : [/reply/:chatDetailsIdx/0] */
    getImage: async (req, res) => {
        const chatDetailsIdx = req.params.chatDetailsIdx;
        const replyImage = req.file.location
        const {UserIdx} = req.decoded

        const {
            replyString,
        } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    UserIdx,
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
    
    /* 사용자 대답 입력 (스트링 한개 + 단어 세개) POST : [/reply/:chatDetailsIdx/3] */
    getWords: async (req, res) => {
        const chatDetailsIdx = req.params.chatDetailsIdx;
        const {UserIdx} = req.decoded
        const {
            replyString,
            word1,
            word2,
            word3
        } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    UserIdx,
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
    /* 사용자 대답 입력 (스트링값 두개) POST : [/reply/:chatDetailsIdx/2] */
    getTwoReplies: async (req, res) => {
        const chatDetailsIdx = req.params.chatDetailsIdx;
        const {
            reply1,
            reply2
        } = req.body;
        const {UserIdx} = req.decoded

        try {
            const comments = await replyService.getTwoReplies(chatDetailsIdx, reply1, reply2, UserIdx);
            if (!comments) {
                console.log('REPLY 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "사용자 대답 입력 (대답두개) 성공"));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },

    /* 사용자 대답 입력 (스트링값 세개) POST : [/reply/:chatDetailsIdx/4] */
    getReplies: async (req, res) => {
        const chatDetailsIdx = req.params.chatDetailsIdx;
        const {
            replyString,
            reply1,
            reply2,
            reply3
        } = req.body;
        const {UserIdx} = req.decoded

        try {
            const comments = await replyService.getThreeReplies(chatDetailsIdx,replyString, reply1, reply2, reply3, UserIdx);
            if (!comments) {
                console.log('REPLY 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "사용자 대답 입력 (대답세개) 성공"));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    },
     /* 사용자 대답 입력 (음성녹음) POST : [/reply/:chatDetailsIdx/100] */
     getAudio: async (req, res) => {
        const chatDetailsIdx = req.params.chatDetailsIdx;
        const replyAudio = req.file.location
        const {UserIdx} = req.decoded

        try {
            const audio = await replyService.getAudio(chatDetailsIdx,replyAudio, UserIdx);
            if (!audio) {
                console.log('REPLY 테이블이 비어있습니다');
                return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            }
            return res.status(sc.OK).send(ut.success(sc.OK, "사용자 대답 입력 (음성녹음) 성공"));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        }
    }
}