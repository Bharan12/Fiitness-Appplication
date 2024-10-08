// controllers/authController.js

const { trainerModel } = require('../models/userModel');
const { userModel } = require('../models/userModel');

const { createSceretToken } = require('../utils/tokenUtils');

module.exports.SignUp = async (req, res, next) => {
    try {
        const { name, email, contact, type, password, } = req.body
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ message: "User already exists" })
        }
        const user = await userModel.create({ name, email, contact, type, password })
        const token = createSceretToken(user._id)
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
        })
        res.json({ message: "User Sign Successfully", success: true, user })
        next()
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};
module.exports.trainerSignUp = async (req, res, next) => {
    try {
        const { id } = req.params
        const { qualifications, expertise, specialization, message } = req.body
        const user = await trainerModel.create({ userId: id, qualifications, expertise, specialization, photo: req.file.filename, message, user: id,})
        const token = createSceretToken(user._id)
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
        })
        res.json({ message: "User Sign Successfully", success: true, user })
        next()
    } catch (err) {

        res.status(500).json({ message: "Internal server error" });
    }
};
