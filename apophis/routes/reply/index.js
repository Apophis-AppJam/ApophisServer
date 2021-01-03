const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');


const replyController = require('../../controller/replyController')

router.post('/:chatAction/1', replyController.getReply);
router.post('/:chatAction/0', upload.single('image'),replyController.getImage);
router.post('/:chatAction/3', replyController.getWords);


module.exports = router;