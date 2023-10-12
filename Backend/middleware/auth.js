const jwt = require('jsonwebtoken')

exports.userAuth = async (req, res, next) => {
    try {

        let token = req?.query?.token
        // console.log("token", token);
        console.log(token)
        if (!token) {
            return res.json({ message: `login ` })
        }
        const decode = await jwt.verify(token, process.env.JWT_SCRETE_KEY)
        // console.log("decode",decode.id)
        req.user = decode
        if (decode.id) {
            next()
        }
    } catch (error) {
        res.status(500).json({ msg: "server error " + error.message })
    }
}
