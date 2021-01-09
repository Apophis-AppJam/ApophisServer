const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');
const replyController = require('../../controller/replyController')
const authUtils = require('../../middlewares/authUtils')

/* 사용자 대답 입력 (스트링값 한개)*/
router.post('/:chatDetailsIdx/1', authUtils.checkToken,replyController.getReply);
/* 사용자 대답 입력 (이미지, 스트링값 한개)*/
router.post('/:chatDetailsIdx/0', authUtils.checkToken,upload.single('image'),replyController.getImage);
/* 사용자 대답 입력 (스트링값 한개, 단어 세개)*/
router.post('/:chatDetailsIdx/3', authUtils.checkToken,replyController.getWords);
/* 사용자 대답 입력 (스트링값 세개)*/
router.post('/:chatDetailsIdx/4', replyController.getReplies);
/* 사용자 대답 입력 (음성녹음)*/
router.post('/:chatDetailsIdx/100', upload.single('audio'), replyController.getAudio);


module.exports = router;
