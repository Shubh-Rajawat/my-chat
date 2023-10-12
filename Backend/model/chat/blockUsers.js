const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    blocker_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    blocked_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{timestamps:true})

const blockeUsermodel=new mongoose.model("blockeUser",schema)

module.exports=blockeUsermodel