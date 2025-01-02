const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactUsFormSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },

})
const ContactUsForm = mongoose.model('ContactUsForm', ContactUsFormSchema);


module.exports = ContactUsForm;