const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    type: String,
    password: String

});

const userModel = mongoose.model("collection_register", userSchema);

const trainerSchema = new mongoose.Schema({
    qualifications: String,
    expertise: String,
    specialization: String,
    photo: String,
    message: String,
    userId: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'collection_register' },
    schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'collection_schedule' }

});
const trainerModel = mongoose.model("collection_trainer", trainerSchema);
module.exports = trainerModel;
const schedule = new mongoose.Schema({
    date: String,
    time: String,
    amount: String,
    trainerId: String,
})
const scheduleModel = mongoose.model("collection_schedule", schedule)
module.exports = { userModel, trainerModel, scheduleModel }