require('dotenv').config();

const express = require('express');
const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('re')
})

const start = async () => {
    try{
        //connect db;
        app.listen(PORT,()=>{
            console.log(`server is listening to port ${PORT}`);
        })
    }catch(err){
        console.log(err);
    }
};

start();
