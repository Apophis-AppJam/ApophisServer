const express = require('express');
const router = express.Router();

const replyController = require('../../controller/replyController')

router.post('/', replyController.getReply);
module.exports = router;