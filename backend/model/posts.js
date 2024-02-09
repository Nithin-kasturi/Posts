const { default: mongoose } = require("mongoose");

const postsSchema=mongoose.model('Post',{
    name:String,
    post:String,
    likes:String,
})
module.exports=postsSchema;