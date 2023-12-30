const express=require("express");
const app =express();
const dotenv=require("dotenv");
const mongoose= require('mongoose');
const authRoute=require('./routes/auth');
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer=require("multer");

dotenv.config();
console.log(process.env.Mongo_URL);
mongoose.connect(process.env.Mongo_URL)
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log('error in connection', err);
    });

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,'checklist.jpg');
    }
});
const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded");
});


app.use(express.json()); //send any json file // Middleware to parse JSON
app.use('/api/auth',authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.use('/',(req,res)=>{
   console.log("hey buddy");
});
app.listen('5000',()=>{
    console.log("backend is running");
    console.log("hello");
});
console.log("yfuhb");