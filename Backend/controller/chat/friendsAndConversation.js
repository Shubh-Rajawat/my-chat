const chatgroupmodel = require("../../model/chat/chatGroup");
const friendsAndConversationmodel = require("../../model/chat/friendsAndConversation");

exports.sendFriendRequest = async (req, res) => {
    try {
        const { sender_Id, friend_id } = req.body

        const findata = await friendsAndConversationmodel.findOne({ sender_Id, friend_id })
        if (findata) {
            return (
                res.status(200).send({
                    status: true,
                    msg: "this Ids are already friends"
                })
            )
        }
        await friendsAndConversationmodel.create({
            sender_Id,
            friend_id
        })
        res.status(200).send({
            status: false,
            msg: "send friend request"
        })
    } catch (error) {
        res.status(500).send({
            status: true,
            msg: error.message
        })
    }
}

exports.accepectFriendRequest = async (req, res) => {
    try {
        const { sender_Id, friend_id } = req.body
        const findata = await friendsAndConversationmodel.findOne({ sender_Id, friend_id })


        if (findata) {
            await friendsAndConversationmodel.updateOne({ _id: findata._id }, { $set: { status: "accpect" } })
            return (
                res.status(200).send({
                    status: true,
                    msg: "your friend request Accepectd"
                })
            )
        }
        const findata1 = await friendsAndConversationmodel.findOne({ sender_Id: friend_id, friend_id: sender_Id })

        if (findata1) {
            await friendsAndConversationmodel.updateOne({ _id: findata1._id }, { $set: { status: "accpect" } })
            return (
                res.status(200).send({
                    status: true,
                    msg: "your friend request Accepectd"
                })
            )
        }

        res.status(200).send({
            status: false,
            msg: "friend not exits"
        })
    } catch (error) {
        res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}

exports.rejectFriendRequest = async (req, res) => {
    try {
        const { sender_Id, friend_id, } = req.body

        const findata = await friendsAndConversationmodel.findOne({ sender_Id, friend_id })
        if (findata) {
            await friendsAndConversationmodel.updateOne({ sender_Id, friend_id }, { $set: { status: "rejectd" } })
            return (
                res.status(200).send({
                    status: true,
                    msg: "your friend request Rejecctd"
                })
            )
        }

        res.status(200).send({
            status: false,
            msg: "friend not exits"
        })

    } catch (error) {
        res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}
exports.fetchFriendList = async (req, res) => {
    try {
        const { userid } = req.body

        const findata = await friendsAndConversationmodel.find({
            $or: [
                { sender_Id: userid },
                { friend_id: userid }
            ]
        }).populate('sender_Id').populate('friend_id')

        let newsukhi = findata.map((it) => {


            if (it.sender_Id._id == userid) {
                return { friend_conversation_id: it._id, friend: it.friend_id }
            }
            if (it.friend_id._id == userid) {
                return { friend_conversation_id: it._id, friend: it.sender_Id }
            }
        });


        let users = []
        // findata.forEach((it) => {
        //     console.log('it==>', it)
        //     users.push(it.sender_Id, it.friend_id)
        // })
        // 
        let ids = users.filter((f) => {
            // console.log('fff==>', f)
            // return f !== sender
            return f
        })

        // console.log('ids ==>', ids)


        // 
        const uniqueid = [...new Set(ids)]
        // 
        // console.log("uniqueid====", uniqueid)


        // const friends = await model.find({ _id: { $in: uniqueid } })


        res.send({
            status: true,
            data: newsukhi
        })


        // if (findata.length) {

        //     return (
        //         res.status(200).send({
        //             status: true,
        //             data: findata
        //         })
        //     )
        // }
        // res.status(200).send({
        //     status: false,
        //     msg: "friend not exits"
        // })

    } catch (error) {
        res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}