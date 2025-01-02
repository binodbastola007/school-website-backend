const express = require('express');
const router = express.Router();
const {
    registerStudent,
    allRegistrationForms,
    approveRegistrationForm
} = require('../controllers/registrationForm');


router.post('/student/register', registerStudent);
router.get('/registration-forms', allRegistrationForms);
router.patch('/registration-forms/:id', approveRegistrationForm);


module.exports = router;