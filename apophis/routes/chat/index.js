const express = require('express');
const router = express.Router();
const authUtils = require('../../middlewares/authUtils')

const chatController = require('../../controller/chatController')

router.get('/:chatDetailsIdx',authUtils.checkToken, chatController.readChat);
router.get('/day/:day', chatController.readChatAll);

module.exports = router;