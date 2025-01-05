const Notices = require('../models/notices');

const getNotices = async (req, res) => {
    const data = await Notices.find();

    if (data.length > 0) {
        res.json({ results: data });
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


const uploadNotice = async (req, res) => {

    try {

        const values = {
            noticeTitle: req.body.noticeTitle,
            noticeDescription: req.body.noticeDescription,
            uploadDate: req.body.uploadDate,

        };
        const data = await Notices.create(values);


        return res.status(201).json({
            msg: {
                message: "Notices successfully uploaded",
                level: 'Success'
            },
            results: data,
        });
    } catch (err) {

        return res.status(500).json({
            msg: {
                message: "An error occurred while uploading the notice. Please try again.",
                level: 'Error'
            },
            error: err.message,
        });
    }
};

const deleteNotice = async (req, res) => {

    try {
        const data = await Notices.deleteOne({ _id: req.params.id });
        if (data) {
            res.json({
                msg: {
                    message: "Removed Notice",
                    level: 'Success'
                }
            });
        }
        else {
            res.json({
                msg: {
                    message: "Couln't remove the notice",
                    level: 'Error'
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }

}

const editNotice = async (req, res) => {

    try {
        const id = req.params.id;

        const updatedData = {
            noticeTitle: req?.body?.noticeTitle,
            noticeDescription: req?.body?.noticeDescription,
            uploadDate: req?.body?.uploadDate,

        };
        const options = { new: true };
        const data = await Notices.findByIdAndUpdate(id, updatedData, options);
        if (data) {
            res.json({
                msg: {
                    message: "Succesfully updated the notice",
                    level: 'Success'
                }
            });
        }
        else {
            res.json({
                msg: {
                    message: "Couln't update the notice",
                    level: 'Error'
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }

}


module.exports = { uploadNotice, getNotices, editNotice, deleteNotice };