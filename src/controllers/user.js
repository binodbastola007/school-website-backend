const { User, Password } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const loginUser = async (req, res) => {
    const userDetails = await User.findOne({ phoneNumber: req.body.phoneNumber }).lean();
    const { password, ...loginDetails } = userDetails;
    if (!userDetails) {
        res.json({ msg: 'Invalid Credentials' })
    } else {
        const isMatched = await bcrypt.compare(req.body.password, userDetails.password)
        // generate token for the users
        var token = jwt.sign({ phoneNumber: req.body.phoneNumber }, process.env.SECRET_KEY);
        if (isMatched) {
            res.json({ msg: 'Login Success', token, loginDetails })
        } else {
            res.json({ msg: 'Incorrect password' })
        }
    }

}

const changePassword = async (req, res) => {
    const values = {
        currentPassword: req.body.currentPassword,
        newPassword: req.body.newPassword,
    }

    try {

        const data = await Password.create(values);
        if (data) {
            res.json({
                msg: {
                    message: "Password sucessfully changed",
                    level: 'Success'
                }
            })
        }
        else {
            res.json({
                msg: {
                    message: "Couldn't change the  password.please try adding again",
                    level: 'Error'
                }
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}



module.exports = { loginUser, changePassword };
