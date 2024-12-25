const express = require('express');
const router = express.Router();
const {
    uploadNotice,
    getNotices
} = require('../controllers/notices');

router.post('/notice-upload', uploadNotice);
router.get('/notices', getNotices);


module.exports = router;