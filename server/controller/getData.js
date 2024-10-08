const Booking = require('../models/bookingModel')
const feedbackModel = require('../models/feedBackModel')
const { userModel } = require('../models/userModel')
const { trainerModel } = require('../models/userModel')
const { scheduleModel } = require('../models/userModel')


module.exports.getTrainerDetails = async (req, res) => {
    try {
        const { id } = req.params
        trainerModel.findOne({ userId: id }).populate('user').then(user => {
            res.json(user)
        }).catch(err => {
            res.json(err)
        })

    } catch (err) {
        res.json(err)
    }
}
module.exports.getTrainerAllDetails = async (req, res) => {
    try {
        const { id } = req.params
        const trainer = await trainerModel.findOne({ userId: id }).populate('user')
        const schedule = await scheduleModel.findOne({ trainerId: id })
        res.json({ message: "Success", trainer, schedule })
    } catch (err) {
        res.json(err)
    }
}
module.exports.getScheduleDetails = async (req, res) => {
    try {
        const { id } = req.params
        scheduleModel.findOne({ trainerId: id }).then(user => {
            res.json(user)
        }).catch(err => {
            res.json(err)
        })
    } catch (err) {
        res.json(err)
    }
}
module.exports.getAllTrainerDetails = async (req, res) => {
    try {
        // Fetch all trainers and populate the 'user' field
        const trainers = await trainerModel.find().populate('user');

        // Use Promise.all to wait for all schedule queries to resolve
        const trainersWithSchedules = await Promise.all(
            trainers.map(async (trainer) => {
                const schedule = await scheduleModel.findOne({ trainerId: trainer.user._id });
                return { schedule }; // Returning trainer and its schedule
            })
        );
        res.json({ trainersWithSchedules, trainers });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

module.exports.getFeedBack = async (req, res) => {
    try {
        const { trainerId } = req.params
        const details = await feedbackModel.find({ trainerId: trainerId }).populate('userId').populate('trainerId')
        res.json({ details })
    } catch (err) {
        res.json(err)
    }
}
module.exports.getBooking = async (req, res) => {
    try {
        const { id } = req.params
        const status = await Booking.find({ sessionId: id })
        console.log(status);
        const user = await Promise.all(
            status.map(async (user) => {
                const details = await userModel.findOne({ _id: user.userId });
                const status=user.status;
                const sessionId=user.sessionId
                return {details,status,sessionId} ; // Returning trainer and its details
            })
        );
        res.json({ user})
    } catch (err) {
        res.json(err)
    }
}

module.exports.getBookingStatus = async (req, res) => {
    try {
        const { id } = req.params
        const status = await Booking.find({ userId: id })
        const user = await Promise.all(
            status.map(async (user) => {
                const details = await scheduleModel.findOne({ trainerId: user.sessionId});
                const status=user.status;
                const sessionId=user.sessionId;
                return {details,status,sessionId} ; // Returning trainer and its details
            })
        );
        res.json({ user})
    } catch (err) {
        res.json(err)
    }
}