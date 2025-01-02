const Dashboard = require('../models/dashboard');

const getDashboardAnalytics = async (req, res) => {
    const data = await Dashboard.find();

    if (data.length > 0) {
        res.json({ data });
    }
    else {
        res.json({
            msg: {
                message: "No data found.",
                level: 'Info'
            }
        });
    }
}


const uploadDashboardAnalytics = async (req, res) => {

    const principalImageFile = req.files?.principalImage?.[0]?.filename || null;
    const vicePrincipalImageFile = req.files?.vicePrincipalImage?.[0]?.filename || null;
    const schoolLogoFile = req.files?.schoolLogoImage?.[0]?.filename || null;

    const PI_FILEURL = `${req.protocol}://${req.get('host')}/uploads/${principalImageFile}`;
    const VI_FILEURL = `${req.protocol}://${req.get('host')}/uploads/${vicePrincipalImageFile}`;
    const SL_FILEURL = `${req.protocol}://${req.get('host')}/uploads/${schoolLogoFile}`;

    try {
        const values = {
            principalImageUrl: PI_FILEURL,
            vicePrincipalImageUrl: VI_FILEURL,
            teacherCount: req.body.teacherCount,
            studentCount: req.body.studentCount,
            messageFromPrincipal: req.body.messagePrincipal,
            messageFromVicePrincipal: req.body.messageFromVicePrincipal,
            ourVision: req.body.ourVision,
            ourMission: req.body.ourMission,
            schoolEmail: req.body.schoolEmail,
            schoolContactNumber: req.body.schoolContactNumber,
            schoolLocation: req.body.schoolLocation,
            facebookLink: req.body.facebookLink,
            schoolLogoImageUrl: SL_FILEURL,
        };
        const data = await Dashboard.create(values);


        return res.status(201).json({
            msg: {
                message: "Saved successfully",
                level: 'Success'
            },
            results: data,
        });
    } catch (err) {

        return res.status(500).json({
            msg: {
                message: "An error occurred while saving the data. Please try again.",
                level: 'Error'
            },
            error: err.message,
        });
    }
};




module.exports = { uploadDashboardAnalytics, getDashboardAnalytics };