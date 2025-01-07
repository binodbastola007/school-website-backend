const express = require('express');
const router = express.Router();
const {
    loginUser,
    changePassword,
    registerUser,
    logoutUser,
    addRole,
    fetchMe,

} = require('../controllers/user');
const { verifyToken } = require('../middlewares/auth');


router.post('/login', loginUser)
router.post('/auth/token/logout', logoutUser)
router.get('/me', verifyToken, fetchMe)
router.post('/register-user', registerUser)
router.post('/change-password', changePassword)
router.post('/user-permissions', addRole)



module.exports = router;