const express = require('express');
const router = express.Router();

const choiceController = require('../../controller/choiceController');


router.get('/:chatActionId', choiceController.readChat);


module.exports = router;