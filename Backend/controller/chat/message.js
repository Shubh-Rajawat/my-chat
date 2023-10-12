const blockeUsermodel = require("../../model/chat/blockUsers");
const chatgroupmodel = require("../../model/chat/chatGroup");
const friendsAndConversationmodel = require("../../model/chat/friendsAndConversation");
const messagesmodel = require("../../model/chat/message");
const fs = require('fs');
const usersmodel = require("../../model/users/users");
const filedelte = (file) => {
    console.log(file);
    for (i = 0; i < file.length; i++) {
        fs.unlink(file[i].path, (err) => {
            if (err) throw err

            console.log("file deleted");
        })
    }
}
exports.messageCreate = async (req, res) => {
    try {
        const { friendsAndConversationId, chatGroupId, sender_id, textmessage, reciever_id, chatType } = req.body
        let file = []
        req.files && req.files.forEach(ele => {
            file.push(ele.path)
        });
        console.log(file);
        if (chatType == 'personal') {
            const finddata = await friendsAndConversationmodel.findOne({ _id: friendsAndConversationId })
            if (finddata) {
                if (finddata.status == "accpect") {
                    const blockdata = await blockeUsermodel.findOne({ blocker_user: sender_id, blocked_user: reciever_id })
                    console.log(reciever_id, sender_id);
                    if (blockdata) {
                        req.files && filedelte(req.files)

                        return (res.status(200).send({
                            status: false,
                            msg: "msg do not send ,user is blocked"
                        }))
                    } else {
                        const blockdata = await blockeUsermodel.findOne({ blocker_user: reciever_id, blocked_user: sender_id })
                        console.log(blockdata);
                        if (blockdata) {
                            req.files && filedelte(req.files)

                            return (res.status(200).send({
                                status: false,
                                msg: "your blocked"
                            }))
                        }
                    }

                    const createmessage = await messagesmodel.create({
                        friendsAndConversationId, sender_id,
                        message: {
                            textmessage,
                            file
                        }
                    })

                    return (res.status(200).send({
                        status: true,
                        msg: "message create",
                        data: createmessage
                    }))
                }
                else {
                    req.files && filedelte(req.files)
                    return (res.status(200).send({
                        status: true,
                        msg: "your request not accpect and can't send your message"
                    }))
                }
            }

            req.files && filedelte(req.files)
            return (
                res.status(200).send({
                    status: true,
                    msg: "conversationID is not found"
                }))
        }
        if (chatType == "group") {
            console.log("group", chatGroupId);
            const finddata = await chatgroupmodel.findOne({ _id: chatGroupId })
            if (finddata) {
                const createmessage = await messagesmodel.create({
                    chatGroupId, sender_id,
                    message: {
                        textmessage,
                        file
                    }
                })

                return (res.status(200).send({
                    status: true,
                    msg: " message create successfully",
                    data: createmessage
                }))
            }
            res.status(200).send({
                status: false,
                msg: "GroupId is not found"
            })
        }

    } catch (error) {
        req.files && filedelte(req.files)
        res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}

exports.messageSeen = async (req, res) => {
    try {
        const { friendsAndConversationId } = req.body
        await messagesmodel.updateOne({ friendsAndConversationId }, { $set: { is_seen: true } })

        res.status(200).send({
            status: true,
            msg: "message seen"
        })

    } catch (error) {
        res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}

exports.fetchAllmessages = async (req, res) => {
    try {
        const { friendsAndConversationId, chatGroupId, chatType, senderid, reciever_id } = req.body
        // console.log(senderid, reciever_id);

        const findata_friend = await friendsAndConversationmodel.findOne({
            sender_Id: senderid,
            friend_id: reciever_id

        })

        let friends = null
        if (findata_friend) {
            friends = {}
            friends.sender = true
            console.log(findata_friend.status);
            if (findata_friend.status == "pending") {
                friends.pending = true
            }

            if (findata_friend.status == "reject") {

                friends.reject = true
            }

            if (findata_friend.status == "accpect") {
                friends.friend = true

            }
            // console.log(findata_friend.status);

        }


        const findata_friend1 = await friendsAndConversationmodel.findOne({

            sender_Id: reciever_id,
            friend_id: senderid

        })
        if (findata_friend1) {
            friends = {}
            friends.reciver = true
            // console.log(findata_friend1.status);
            if (findata_friend1.status == "pending") {
                friends.pending = true
            }

            if (findata_friend1.status == "reject") {
                friends.reject = true
            }

            if (findata_friend1.status == "accpect") {
                friends.friend = true

            }

        }


        if (friends?.friend == true) {
            console.log(friends, "afsgdf");

            if (chatType == "personal") {


                const findBlockUser = await blockeUsermodel.findOne({
                    blocker_user: senderid,
                    blocked_user: reciever_id
                })
                if (findBlockUser) {
                    friends.blocker = true
                }
                const findBlockUser1 = await blockeUsermodel.findOne({
                    blocker_user: reciever_id,
                    blocked_user: senderid
                })
                if (findBlockUser1) {
                    friends.blocked = true
                }
                console.log('findBlockUser', findBlockUser)


                const finddata = await messagesmodel.find({ friendsAndConversationId }).populate({ path: "sender_id", select: "username profile_photo" })

                let newarr = []
                const filter_Data = finddata.map((it) => {
                    console.log(it.sender_id._id, senderid);
                    if (it.sender_id._id == senderid) {
                        newarr.push({ it, me: true })
                        it.me = true
                    } else {

                        newarr.push({ it, me: false })
                        it.me = false
                    }
                })

                if (finddata.length) {
                    return (
                        res.status(200).send({
                            status: true,
                            friend: friends ? friends : false,
                            data: newarr
                        })
                    )
                }
                else {
                    return (res.status(200).send({
                        status: false,
                        data: finddata,
                        friend: friends ? friends : false,
                        msg: "no found data"
                    }))
                }
            }
            if (chatType == "group") {
                const finddata = await messagesmodel.find({ chatGroupId })

                if (finddata.length) {
                    let data = []


                    for (let i = 0; i < finddata.length; i++) {
                        const element = finddata[i];
                        const user = await usersmodel.findOne({ _id: element.sender_id }).select("username profile_photo")
                        data.push({ messagedata: element, username: user.username, profile_photo: user.profile_photo })

                    }

                    return (
                        res.status(200).send({
                            status: true, friend: friends ? friends : false,

                            data: data
                        })
                    )
                }
                else {
                    return (res.status(200).send({
                        status: false,
                        friend: friends ? friends : false,

                        data: finddata,
                        msg: "no found data"
                    }))
                }
            }
            else {
                return (
                    res.status(200).send({
                        msg: "invalid chattype"
                    })
                )
            }
        }


        res.status(200).send({
            status: false,
            friend: friends ? friends : false,
            msg: "not friend"
        })


    } catch (error) {
        console.log(error.message);
        res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}

exports.deletemessage = async (req, res) => {
    try {
        const { messageid, msgdeletetype, fileindex } = req.body

        const finddata = await messagesmodel.findOne({ _id: messageid })
        if (finddata) {
            if (msgdeletetype == "text") {

                if (!finddata?.message?.file?.length) {
                    await messagesmodel.deleteOne({ _id: messageid })
                    return (res.status(200).send({
                        status: true,
                        msg: "msg was delete"
                    }))
                }
                finddata.message.textmessage = ""
                await finddata.save()
                return (res.status(200).send({
                    status: true,
                    msg: "msg was delete"
                }))
            }
            if (msgdeletetype == "file") {
                if (finddata.message.file.length < 1 && finddata.message.textmessage == "") {
                    await messagesmodel.deleteOne({ _id: messageid })
                    return (res.status(200).send({
                        status: true,
                        msg: "msg file was delete"
                    }))
                }
                const deltefilepath = finddata.message.file[fileindex]
                finddata.message.file.splice(fileindex, 1)
                deltefilepath && fs.unlink(deltefilepath, (err) => {
                    if (err) throw err
                    console.log("file delete");
                })
                console.log(finddata);
                await finddata.save()
                return (res.status(200).send({
                    status: true,
                    msg: "msg file was delete"
                }))
            }

        } else {
            res.status(200).send({
                status: false,
                msg: "this messageid is not exits"
            })
        }
    } catch (error) {
        res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}

exports.deleteAllchatmessagesPersonalchat = async (req, res) => {
    try {
        const { friendsAndConversationId } = req.body
        const findata = await messagesmodel.find({ friendsAndConversationId })
        if (findata) {
            const findatafile = await messagesmodel.find({ friendsAndConversationId }).select('message.file')

            await messagesmodel.deleteMany({ friendsAndConversationId })
            console.log(findatafile);
            let allfilepath = []
            findatafile.forEach((it) => {
                allfilepath.push(...it.message.file)
            })
            console.log(allfilepath);
            allfilepath.length && allfilepath.forEach((path) => {
                fs.unlink(path, (err) => {
                    if (err) throw err

                    console.log("file deleted");
                })
            })

            return (res.status(200).send({
                status: true,
                msg: "chat messages deleted"
            }))
        }

        res.status(200).send({
            status: false,
            msg: "this conversation Id is not exits"
        })

    } catch (error) {
        res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}