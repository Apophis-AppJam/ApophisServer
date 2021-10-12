const express = require("express");
const router = express.Router();
const upload = require("../../modules/multer");
const userController = require("../../controller/userController");

const authUtils = require("../../middlewares/authUtils");
/* 사용자 로그인 */
router.post("/login", userController.login);
router.post("/phone", authUtils.checkToken, userController.phone);

module.exports = router;
