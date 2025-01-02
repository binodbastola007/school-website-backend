const ContactUsForm = require('../models/contactus-form');

const contactUs = async (req, res) => {

    try {

        const value = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        };

        const data = await ContactUsForm.create(value);


        return res.status(201).json({
            msg: {
                message: "Contact us form sent successfully",
                level: 'Success'
            }
            ,
            results: data,
        });
    } catch (err) {

        return res.status(500).json({
            msg: {
                message: "An error occurred while sending the contact us form. Please try again.",
                level: 'Error'
            },
            error: err.message,
        });
    }
};



module.exports = { contactUs };