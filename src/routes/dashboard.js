const express = require('express');
const router = express.Router();
const {
    uploadDashboardAnalytics,
    getDashboardAnalytics,

} = require('../controllers/dashboard');

router.post('/dashboard-analytics', uploadDashboardAnalytics);
router.get('/dashboard-analytics', getDashboardAnalytics);


module.exports = router;