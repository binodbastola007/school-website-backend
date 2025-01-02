const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegistrationFormSchema = new Schema({
    Nameofthestudent: { type: String, required: true },
    Grade: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    Age: { type: Number, required: true },
    ParentName: { type: String, required: true },
    Occupation: { type: String, required: true },
    Mobile: { type: Number, required: true },
    Transportation: { type: String, required: true },
    HowDidYouHear: { type: String, required: true },
    isApproved: { type: Boolean, required: true },

})
const RegistrationForm = mongoose.model('RegistrationForm', RegistrationFormSchema);


module.exports = RegistrationForm;