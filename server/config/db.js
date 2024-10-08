const mongoose=require('mongoose')
const{MONGO_URL,PORT}=process.env
const dbConnection=async()=>{ 
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
   
}
module.exports=dbConnection