const blockeUsermodel = require("../../model/chat/blockUsers");

exports.createblockUser = async (req, res) => {
    try {
        const { blocker_user, blocked_user } = req.body

        const finddata = await blockeUsermodel.findOne({ blocker_user, blocked_user })

        if (finddata) {
            return (res.status(200).send({
                status: false,
                msg: "this users are already blocked"
            }))
        }
        await blockeUsermodel.create({
            blocker_user, blocked_user
        })

        res.status(200).send({
            status: true,
            msg: "user blocked"
        })

    } catch (error) {
        res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}


exports.userUnBlock = async (req, res) => {
    try {
        const { blocker_user, blocked_user } = req.body

        const finddata = await blockeUsermodel.findOne({
            $and: [

                { blocked_user: blocked_user }, { blocker_user: blocker_user }
            ]
        })
        console.log(finddata, "unblickckc");
        if (finddata) {
            await blockeUsermodel.deleteOne({ _id: finddata._id })

            return (res.status(200).send({
                status: true,
                msg: "user are unblocked"
            }))
        }

        res.status(200).send({
            status: false,
            msg: "this users not found "
        })

    } catch (error) {
        res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}

exports.getsingleBlockUser = async (req, res) => {
    try {
        const { sender_id, reciever_id } = req.body

        const finddata = await blockeUsermodel.findOne({ blocker_user: sender_id, blocked_user: reciever_id })

        if (finddata) {
            return (res.status(200).send({
                status: true,
                msg: "this users blocked",
                data: finddata
            }))
        }
        else {
            const finddata = await blockeUsermodel.findOne({ blocker_user: reciever_id, blocked_user: sender_id })
            if (finddata) {
                return (res.status(200).send({
                    status: true,
                    msg: "you are block",
                    data: finddata
                }))
            } else {
                return (res.status(200).send({
                    status: false,
                    msg: "no user block",

                }))
            }
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}