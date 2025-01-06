const express = require('express');
const router = express.Router();
const {
    registerStudent,
    allRegistrationForms,
    approveRegistrationForm
} = require('../controllers/registrationForm');


router.post('/student/register', registerStudent);
router.get('/registration-requests', allRegistrationForms);
router.patch('/registration-requests/:id', approveRegistrationForm);


module.exports = router;