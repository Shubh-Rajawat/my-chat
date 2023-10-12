const mongoose = require('mongoose');
const messagesmodel = require('./message');
const fs=require('fs')
const filedelte=(file)=>{
    if(file){
        fs.unlink(file,(err)=>{
            if(err) throw err

            console.log("file deleted");
        })
    }
}
const schema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    groupImage: {
        type: String,

    },
    members: [
        {
            type: String, ref: "users", required: true
        }
    ]
}, { timestamps: true })

schema.pre("deleteOne",async function(next){
    console.log("test",this._conditions._id);
    const findmessage=await messagesmodel.find({chatGroupId:this._conditions._id}).select("message.file")
        console.log(findmessage);
        let allfilepath=[]
        findmessage.forEach((it)=>{
            // console.log(it.message.file);
            allfilepath.push(...it.message.file)
        })
        console.log(allfilepath);
    const deletemessage=await messagesmodel.deleteMany({chatGroupId:this._conditions._id})
    allfilepath.length && allfilepath.forEach((file)=>{
        filedelte(file)
    })
    
    next()
})
const chatgroupmodel = new mongoose.model("chatgroup", schema)

module.exports = chatgroupmodel