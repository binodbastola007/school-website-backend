const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const registerUser = async (req, res) => {

    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(409).json({ msg: "Email already taken" });
        }

        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashPassword;
        const data = await User.create(req.body);

        if (data) {
            res.json({ msg: "Registered successfully" });
        } else {
            res.json({ msg: "Couldn't register the user. Please try registering again." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error. Please try again." });
    }
};

const loginUser = async (req, res) => {
    try {
        const userDetails = await User.findOne({ email: req.body.email }).lean();
        if (!userDetails) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        const isMatched = await bcrypt.compare(req.body.password, userDetails.password);

        if (isMatched) {
            const { password, ...loginDetails } = userDetails;
            const token = jwt.sign({ email: userDetails.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.json({
                msg: {
                    message: 'Login Success',
                    level: 'Success'
                },
                results: {
                    token,
                    loginDetails
                }
            });
        } else {
            res.status(401).json({ msg: 'Incorrect password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error. Please try again." });
    }
};
const logoutUser = async (req, res) => {
    try {
        const access = req.body.access;
        if (access) {
            res.json({
                msg: {
                    message: "User has been logged out successfully",
                    level: 'Success'
                }
            });
        } else {
            res.json({
                msg: {
                    message: "User is not authorized. No access token",
                    level: 'Error'
                }
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: {
                message: "Server error",
                level: 'Success'
    }
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({
                msg: {
                    message: "All fields are required.",
                    level: 'Success'
                }
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                msg: {
                    message: "User not found.",
                    level: 'Error'
                }
            });
        }

        const isMatched = await bcrypt.compare(currentPassword, user.password);
        if (!isMatched) {
            return res.status(401).json({
                msg: {
                    message: "Current password is incorrect.",
                    level: 'Error'
                }
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedNewPassword;
        await user.save();

        res.json({
            msg: {
                message: "Password successfully changed.",
                level: "Success",
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: {
                message: "An error occurred while changing the password. Please try again.",
                level: "Error",
            },
        });
    }
};

module.exports = { registerUser, loginUser, changePassword, logoutUser };
