const express = require('express');
const router = express.Router();

const choiceController = require('../../controller/choiceController');

router.get('/:day/:chatActionId', choiceController.readChat);

module.exports = router;