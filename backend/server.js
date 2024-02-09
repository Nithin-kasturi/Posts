const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./model/user');
const jwt=require('jsonwebtoken');
const Post=require('./model/posts');
const { createToken, validateToken } = require('./JWT');
app.use(express.json());
app.use(cors());
app.listen(process.env.PORT || 8000, () => {
    console.log('Server connected');
});
app.get('/',(req,res)=>{
    res.send("Server is running");
});
mongoose.connect('mongodb://localhost:27017/posts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => console.log(err));
app.post('/register',async (req,res)=>{
    const {email,password,name,image}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        bcrypt.hash(password,10).then((hash)=>{
            const newUser=new User({
                email:email,
                password:hash,
                image:image,
                name:name,
            });
            newUser.save();
        })
        res.send("OK");
    }
    else{
        res.send("User Already exists");
    }
});
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        res.send("User Doesn't Exsists");
    }
    else{
        const userPassword=user.password;
        bcrypt.compare(password,userPassword).then((match)=>{
            if(!match){
                res.send("Passwords doesn't match");
            }
            else{
                const accessToken=createToken(user);
                res.cookie("Access-token",accessToken,{
                    maxAge:60*60*24*30*1000,
                });
                console.log("Access Token",accessToken);
                res.send("OK");
            }
        })
    }
});
app.get('/posts',async (req,res)=>{
    const posts=await Post.find({});
    res.json(posts);
});