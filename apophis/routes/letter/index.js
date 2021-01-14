const express = require('express');
const router = express.Router();
const authUtils = require('../../middlewares/authUtils')

const letterController = require('../../controller/letterController');


router.get('/', authUtils.checkToken, letterController.getLetter);
router.post('/', authUtils.checkToken, letterController.postLetter);


module.exports = router;