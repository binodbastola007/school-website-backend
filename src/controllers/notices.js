const Notices = require('../models/notices');

const getNotices = async (req, res) => {
    const data = await Notices.find();

    if (data.length > 0) {
        res.json({ data });
    }
    else {
        res.json({ msg: "No data found." });
    }
}


const uploadNotice = async (req, res) => {

    try {

        const values = {
            noticeTitle: req.body.noticeTitle,
            noticeDescription: req.body.noticeDescription,
            uploadDate: req.body.uploadDate,
            noticeImageUrl: req.body.noticeImageUrl,
        };
        const data = await Notices.create(values);


        return res.status(201).json({
            msg: "Notices successfully uploaded",
            Notice: data,
        });
    } catch (err) {

        return res.status(500).json({
            msg: "An error occurred while uploading the notice. Please try again.",
            error: err.message,
        });
    }
};




module.exports = { uploadNotice, getNotices };