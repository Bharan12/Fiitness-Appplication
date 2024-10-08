
const feedbackModel = require('../models/feedBackModel')
const Booking = require('../models/bookingModel');
const { create } = require('../models/userModel');
module.exports.postFeedback = async (req, res, next) => {
    try {
        const { userId, trainerId } = req.params;
        const { feedback } = req.body
        console.log(feedback);
        const date = new Date()
        const correntTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes()
        const correntDate = new Date().toJSON().slice(0, 10)
        const user = await feedbackModel.create({ feedback, date: correntDate, time: correntTime, userId: userId, trainerId: trainerId })
        res.json({ message: "feedback Successfully", success: true, user })
        next()
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
    }
};

module.exports.postBooking = async (req, res) => {
    const { userId, sessionId } = req.body;
    try {
        const newBooking = await Booking.create({
            sessionId: sessionId,
            userId: userId,
            status: 'pending'  // Initially, set the booking status to pending
        });
        console.log(newBooking);
        res.status(201).json({ message: 'Booking request submitted, pending approval', newBooking });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit booking request' });
    }
}
module.exports.postApproveBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { action } = req.body;  // 'approve' or 'deny'

    console.log(bookingId,action);
    try {
        const booking = await Booking.updateMany({sessionId:bookingId},{status:action === 'approve' ? 'approved' : 'denied'});
        console.log(booking);
        res.status(200).json({ message: `Booking ${booking.status}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking status' });
    }

}