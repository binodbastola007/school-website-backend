const RegistrationForm = require('../models/registrationForm');

const allRegistrationForms = async (req, res) => {
    const skipCount = (req.query.page - 1) * 12;
    const data = await RegistrationForm.find().limit(12).skip(skipCount);
    const totalCount = await RegistrationForm.find().countDocuments();


    if (data.length > 0) {
        res.json({ data, totalCount });
    }
    else {
        res.json({ msg: "No Registration form found." });
    }
}


const registerStudent = async (req, res) => {

    try {

        const value = {
            Nameofthestudent: req.body.Nameofthestudent,
            Grade: req.body.Grade,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            Age: req.body.Age,
            ParentName: req.body.ParentName,
            Occupation: req.body.Occupation,
            Mobile: req.body.Mobile,
            Transportation: req.body.Transportation,
            HowDidYouHear: req.body.HowDidYouHear,
            isApproved: false,
        };

        const data = await RegistrationForm.create(value);


        return res.status(201).json({
            msg: {
                message: "Registration request sent successfully",
                level: 'Success'
            },
            results: data,
        });
    } catch (err) {

        return res.status(500).json({
            msg: "An error occurred while sending the registration request. Please try again.",
            error: err.message,
        });
    }
};



const approveRegistrationForm = async (req, res) => {

    try {
        const id = req.params.id;

        const value = {
            isApproved: req.body.isApproved,
        };
        const options = { new: true };
        const data = await Post.findByIdAndUpdate(id, value);
        if (data) {
            res.json({
                msg: {
                    message: "Succesfully approved registration form",
                    level: 'Success'
                }
            });
        }
        else {
            res.json({
                msg: {
                    message: "Couln't approve registation form",
                    level: 'Error'
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }

}




module.exports = { registerStudent, allRegistrationForms, approveRegistrationForm };