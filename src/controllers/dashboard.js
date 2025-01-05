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
    try {

        const principalImageFile = req.files?.principalImage?.[0]?.filename || null;
        const vicePrincipalImageFile = req.files?.vicePrincipalImage?.[0]?.filename || null;
        const schoolLogoFile = req.files?.schoolLogo?.[0]?.filename || null;

        const PI_FILEURL = principalImageFile
            ? `${req.protocol}://${req.get('host')}/uploads/${principalImageFile}`
            : null;
        const VI_FILEURL = vicePrincipalImageFile
            ? `${req.protocol}://${req.get('host')}/uploads/${vicePrincipalImageFile}`
            : null;
        const SL_FILEURL = schoolLogoFile
            ? `${req.protocol}://${req.get('host')}/uploads/${schoolLogoFile}`
            : null;


        const updateValues = {
            ...(PI_FILEURL && { principalImageUrl: PI_FILEURL }),
            ...(VI_FILEURL && { vicePrincipalImageUrl: VI_FILEURL }),
            ...(SL_FILEURL && { schoolLogoImageUrl: SL_FILEURL }),
            ...(req.body.teacherCount && { teacherCount: req.body.teacherCount }),
            ...(req.body.studentCount && { studentCount: req.body.studentCount }),
            ...(req.body.messagePrincipal && { messageFromPrincipal: req.body.messagePrincipal }),
            ...(req.body.messageVicePrincipal && { messageFromVicePrincipal: req.body.messageVicePrincipal }),
            ...(req.body.ourVision && { ourVision: req.body.ourVision }),
            ...(req.body.ourMission && { ourMission: req.body.ourMission }),
            ...(req.body.schoolEmail && { schoolEmail: req.body.schoolEmail }),
            ...(req.body.schoolContactNumber && { schoolContactNumber: req.body.schoolContactNumber }),
            ...(req.body.schoolLocation && { schoolLocation: req.body.schoolLocation }),
            ...(req.body.facebookLink && { facebookLink: req.body.facebookLink }),
        };

        const data = await Dashboard.findOneAndUpdate(
            {},
            { $set: updateValues },
            { upsert: true, new: true }
        );

        return res.status(200).json({
            msg: {
                message: "Dashboard data updated successfully",
                level: "Success",
            },
            results: data,
        });
    } catch (err) {
        console.error("Error updating dashboard analytics:", err);

        return res.status(500).json({
            msg: {
                message: "An error occurred while updating the data. Please try again.",
                level: "Error",
            },
            error: err.message,
        });
    }
};




module.exports = { uploadDashboardAnalytics, getDashboardAnalytics };