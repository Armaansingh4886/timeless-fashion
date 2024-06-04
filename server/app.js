require("dotenv").config();
const express=require('express');
const app=express();
 const cors=require("cors")
const router=require("./Routes/router")
require("./db/conn")
app.use(cors())
app.use(express.json())
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use('/uploads', express.static('uploads'));

const port=process.env.PORT;
app.use(router)
app.get("/",(req,res)=>{
    res.send("welcome to the new dairy project")
})
app.listen(port,()=>{
    console.log(`server is running in the port no. ${port}`)
})