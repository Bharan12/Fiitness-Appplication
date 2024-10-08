const {scheduleModel, trainerModel}=require('../models/userModel');

module.exports.Schedule=(req,res)=>{
    const {date,time,amount}=req.body
    const {id}=req.params;
    scheduleModel.create({trainerId:id,date:date,time:time,amount:amount}).then(user=>{
        trainerModel.updateOne(
            { _id: id},
            { $set: { schedule: user._id } }  // Link schedule in the trainer model
          );
        res.json({message:'Success',user:user})
    }).catch((err)=>{
        console.log(err);
        res.json({message:err})
    })
}
