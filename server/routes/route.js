const express = require('express');
const router = express.Router();
const{SignUp,trainerSignUp} =require('../controller/authController');
const { getTrainerDetails, getScheduleDetails, getAllTrainerDetails, getTrainerAllDetails, getFeedBack, getBooking, getBookingStatus } = require('../controller/getData');
const{SignIn}=require('../controller/login');
const multer =require('multer')
const path = require('path');
const { Schedule } = require('../controller/schedule');
const { postFeedback, postBooking, postApproveBooking } = require('../controller/postData');
const { postPayment } = require('../controller/payment');
const { trainerUpdateAllDetails, trainerScheduleUpdate } = require('../controller/putData');
const { scheduleDelete } = require('../controller/delete');
// const {postPaymet,getPayment}=require('../controller/payment')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Assets/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
var type = upload.single('file');
router.post("/signup",SignUp)
router.post("/signin",SignIn)
router.post('/trainer/signup/:id',type,trainerSignUp)
router.get('/tdata/:id',getTrainerDetails);
router.get('/get/update/:id',getTrainerDetails)
router.post('/trainer/schedule/:id',Schedule)
router.get('/schedule/data/:id',getScheduleDetails)
router.get('/get/trainer',getAllTrainerDetails)
router.get('/tdata/fulldetails/:id',getTrainerAllDetails);
router.get('/get/feedback/:trainerId',getFeedBack);
router.post('/user/feedback/:userId/:trainerId',postFeedback)
router.post('/razorpay',postPayment);
router.put('/trainer/data/update/:id',type,trainerUpdateAllDetails)
router.put('/trainer/schedule/update/:id',trainerScheduleUpdate);
router.delete('/schedule/delete/:id',scheduleDelete)
router.post('/user/booking',postBooking);
router.post('/booking/approve/:bookingId',postApproveBooking);
router.get('/booking/data/:id',getBooking)
router.get('/booking/data/status/:id',getBookingStatus);
module.exports=router