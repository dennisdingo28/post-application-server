require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./db/connectDB');
const authenticate = require('./middleware/authenticated')
const PORT = process.env.PORT || 5000;

const authRouter = require('./routes/auth');
const postsRouter = require('./routes/post');

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('this is the server')
})

app.use('/auth',authRouter);
app.use('/posts',postsRouter);

app.post('/decode',async (req,res,next)=>{
    try{
        
        const token = req.headers.authorization.split(' ')[1];
        
        const payload = await jwt.verify(token,process.env.JWT_ENCRYPTION);

        res.status(200).json({userId:payload.userId,name:payload.name});
    }catch(err){
        next(err);
    }
});

app.use(notFound);

app.use(errorHandler);

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
