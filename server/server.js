const dbConnection = require('./config/db');
const express=require('express');
const cors=require('cors');
const authRoutes=require('./routes/route');
const cookieParser=require('cookie-parser');
const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(express.static('Assets'))
app.use(cors({
    origin:'http://localhost:5173',
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

 const PORT=3000;

 app.use('/',authRoutes)
dbConnection()

app.listen(PORT, () => {
    console.log(`server is ruinng ${PORT}`)
})