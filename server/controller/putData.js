const { trainerModel } = require('../models/userModel');
const { userModel } = require('../models/userModel');
const { scheduleModel } = require('../models/userModel');

module.exports.trainerUpdateAllDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, contact, qualifications, expertise, specialization, message } = req.body;

        console.log(name, email, contact, qualifications, expertise, specialization, message);
        console.log(id);

        // Update trainer details
        const updateFields = {
            qualifications: qualifications || 'none',
            expertise,
            specialization,
            message,
        };

        // Check if a new photo is uploaded
        if (req.file) {
            updateFields.photo = req.file.filename;
        }

        const trainerUpdate = await trainerModel.findOneAndUpdate
            ({ userId: id }, updateFields, { new: true });

        // Update user details
        const userUpdate = await userModel.findByIdAndUpdate(id, {
            name,
            email,
            contact,
        }, { new: true });

        console.log(trainerUpdate, userUpdate);

        res.status(200).json({ message: "Update successfully", trainerUpdate, userUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating details" });
    }
};

module.exports.trainerScheduleUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, time, amount } = req.body;
        console.log(date, time, amount);
        console.log(id);

        // Update the schedule for the trainer
        const trainerSchedule = await scheduleModel.findOneAndUpdate(
            { trainerId: id }, // Find by trainerId
            { date, time, amount }, // Update fields
            { new: true } // Return the updated document
        );

        if (!trainerSchedule) {
            return res.status(404).json({ message: "Trainer schedule not found" });
        }

        console.log(trainerSchedule);

        res.status(200).json({ message: "Update successfully", trainerSchedule });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating the schedule" });
    }
};
