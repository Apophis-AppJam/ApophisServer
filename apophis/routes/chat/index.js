const express = require('express');
const router = express.Router();

const chatController = require('../../controller/chatController')

router.get('/:chatDetailsIdx', chatController.readChat);
router.get('/day/:day', chatController.readChatAll);

module.exports = router;