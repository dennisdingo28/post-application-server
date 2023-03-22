require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./db/connectDB');
const PORT = process.env.PORT || 5000;


const authRouter = require('./routes/auth')

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('this is the server')
})

app.use('/auth',authRouter);


const start = async () => {
    try{
        //connect db;
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`server is listening to port ${PORT}`);
        })
    }catch(err){
        console.log(err);
    }
};

start();
