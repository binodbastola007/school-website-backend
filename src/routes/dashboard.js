const express = require('express');
const router = express.Router();
const {
    uploadDashboardAnalytics,
    getDashboardAnalytics,

} = require('../controllers/dashboard');

const { upload } = require('../middlewares/imageUpload');

router.patch('/dashboard-analytics',
    upload.fields([
        { name: 'principalImage', maxCount: 1 },
        { name: 'vicePrincipalImage', maxCount: 1 },
        { name: 'schoolLogo', maxCount: 1 },
    ]), uploadDashboardAnalytics);
router.get('/dashboard-analytics', getDashboardAnalytics);


module.exports = router;