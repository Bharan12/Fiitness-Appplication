const {scheduleModel}=require('../models/userModel')



module.exports.scheduleDelete = async (req, res,) => {
    try {
        const id = req.params.id;
        console.log(id);
        const scheduleDelete = await scheduleModel.deleteOne({ trainerId: id })
        res.json({ message: 'Product Delete Successfully', scheduleDelete })
       
    } catch (err) {
        res.json(err)
    }
}