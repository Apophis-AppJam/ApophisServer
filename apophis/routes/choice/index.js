const express = require('express');
const router = express.Router();

const choiceController = require('../../controller/choiceController');

router.get('/', choiceController.readChat);

module.exports = router;