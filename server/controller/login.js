
const {userModel}=require('../models/userModel')
const {createSceretToken}=require('../utils/tokenUtils')
module.exports.SignIn = async (req, res,next) => {
    try {
        const { email, password } = req.body;
        console.log(email,password)
        const user= await userModel.findOne({email})
        if (!user) {
            return res.json({ message: 'User Not Found' })
        }
        const auth = await password === user.password
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const token = createSceretToken(user._id)
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false,
        })
        res.status(201).json({ message: 'Login Successfully', Status: "Success", success: true, user, token })
        next()
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
