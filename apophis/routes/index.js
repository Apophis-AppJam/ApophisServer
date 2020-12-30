var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/user', require('./user'))
router.use('/choice', require('./choice'))
router.use('/reply', require('./reply'))
router.use('/chat', require('./chat'))
module.exports = router;
