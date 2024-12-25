const Dashboard = require('../models/dashboard');

const getDashboardAnalytics = async (req, res) => {
    const data = await Dashboard.find();

    if (data.length > 0) {
        res.json({ data });
    }
    else {
        res.json({ msg: "No data found." });
    }
}


const uploadDashboardAnalytics = async (req, res) => {

    try {

        const values = {
            principalImageUrl: req.body.principalImageUrl,
            vicePrincipalImageUrl: req.body.vicePrincipalImageUrl,
            teacherCount: req.body.teacherCount,
            studentCount: req.body.studentCount,
            messageFromPrincipal: req.body.messageFromPrincipal,
            messageFromVicePrincipal: req.body.messageFromVicePrincipal,
            ourVision: req.body.ourVision,
            ourMission: req.body.ourMission,
            schoolEmail: req.body.schoolEmail,
            schoolContactNumber: req.body.schoolContactNumber,
            schoolLocation: req.body.schoolLocation,
            facebookLink: req.body.facebookLink,
            schoolLogoImageUrl: req.body.schoolLogoImageUrl,
        };
        const data = await Dashboard.create(values);


        return res.status(201).json({
            msg: "Saved successfully",
            analytics: data,
        });
    } catch (err) {

        return res.status(500).json({
            msg: "An error occurred while saving the data. Please try again.",
            error: err.message,
        });
    }
};




module.exports = { uploadDashboardAnalytics, getDashboardAnalytics };