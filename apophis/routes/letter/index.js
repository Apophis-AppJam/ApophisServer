const express = require('express');
const router = express.Router();
const authUtils = require('../../middlewares/authUtils')

const letterController = require('../../controller/letterController');


router.get('/new', authUtils.checkToken, letterController.getLetter);
router.get('/view', authUtils.checkToken, letterController.viewLetter);
router.post('/', authUtils.checkToken, letterController.postLetter);


module.exports = router;