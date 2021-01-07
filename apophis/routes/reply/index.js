const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');


const replyController = require('../../controller/replyController')

router.post('/:chatDetailsIdx/1', replyController.getReply);
router.post('/:chatDetailsIdx/0', upload.single('image'),replyController.getImage);
router.post('/:chatDetailsIdx/3', replyController.getWords);


module.exports = router;
