const express = require('express');
const router = express.Router();

const chatController = require('../../controller/chatController')

router.get('/:day/:chatDetailsIdx', chatController.readChat);

module.exports = router;