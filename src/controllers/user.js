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
    console.log(req)
    try {

        const data = await Password.findOneAndUpdate(values);
        if (data) {
            res.json({ msg: "Password sucessfully changed" })
        }
        else {
            res.json({ msg: "Couldn't change the  password.please try adding again" })
        }
    }
    catch (err) {
        console.log(err);
    }
}



module.exports = { loginUser, changePassword };
