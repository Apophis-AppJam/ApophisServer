const express = require('express');
const router = express.Router();

const chatController = require('../../controller/chatController')

router.get('/a',chatController.readChats);

module.exports = router;