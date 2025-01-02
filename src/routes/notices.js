const express = require('express');
const router = express.Router();
const {
    uploadNotice,
    getNotices,
    deleteNotice,
    editNotice,
} = require('../controllers/notices');

router.post('/notices', uploadNotice);
router.get('/notices', getNotices);
router.patch('/notices/:id', editNotice);
router.delete('/notices/:id', deleteNotice);


module.exports = router;