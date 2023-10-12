const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    sender_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    friend_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "reject"],
        required: true,
        default: "pending"
    },
    created_At: {
        type: Date,
        default: new Date(Date.now())
    }
}, { timestamps: true })

const friendsAndConversationmodel = new mongoose.model("friendsAndConversation", schema)

module.exports = friendsAndConversationmodel