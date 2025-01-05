const express = require('express');
const router = express.Router();
const { loginUser, changePassword, registerUser, logoutUser } = require('../controllers/user');


router.post('/login', loginUser)
router.post('/auth/token/logout', logoutUser)
router.post('/register-user', registerUser)
router.post('/change-password', changePassword)


module.exports = router;