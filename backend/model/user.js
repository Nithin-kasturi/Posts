const mongoose=require('mongoose');
const userSchema=mongoose.model('User',{
    email:String,
    password:String,
    image:String,
    name:String,
});
module.exports=userSchema;