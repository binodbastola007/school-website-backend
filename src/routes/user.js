const express = require('express');
const router = express.Router();
const { loginUser, changePassword } = require('../controllers/user');


router.post('/login', loginUser)
router.post('/change-password', changePassword)


module.exports = router;