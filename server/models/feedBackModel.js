const mongoose=require('mongoose')

const feedback= new mongoose.Schema({
    feedback: String,
    date: String,
    time: String,
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'collection_register' },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'collection_trainer' },
})
const feedbackModel = mongoose.model("collection_feedback", feedback);

module.exports =feedbackModel;