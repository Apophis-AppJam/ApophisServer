const express = require('express');
const router = express.Router();
const authUtils = require('../../middlewares/authUtils')

const letterController = require('../../controller/letterController');

//현재 가진 전체 버킷리스트 불러오기
router.get('/', authUtils.checkToken, bucketController.getAllBucket);

//버킷리스트 작성
router.post('/', authUtils.checkToken, bucketController.postBucket);

//
router.put('/', authUtils.checkToken, );

module.exports = router;