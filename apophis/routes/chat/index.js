const express = require('express');
const router = express.Router();

const chatController = require('../../controller/chatController')

router.get('/:chatDetailsIdx', chatController.readChat);

module.exports = router;4