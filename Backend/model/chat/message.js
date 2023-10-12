const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    friendsAndConversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"friendsAndConversation",
    },
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    message:{
        textmessage:{
            type:String
        },file:{
            type:Array
        }
    },
    chatGroupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chatgroup",
    },
    is_seen:{
        type:String,
        required:true,
        default:false
    },
},{timestamps:true})

const messagesmodel=new mongoose.model("messages",schema)

module.exports=messagesmodel