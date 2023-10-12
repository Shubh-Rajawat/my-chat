// const db = require('../config/db')
const userModel = require( '../../model/users/users' )
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );

exports.userSingup = async ( req, res ) => {
    try {
        const { username, email, password } = req.body

        // const image = req.file.path

        const findData = await userModel.find( { email } )
        if ( findData.length ) {
            return res.status( 409 ).json( "Email already exist" )
        } else {
            const hashPassword = await bcrypt.hash( password, 10 )
            const userData = await userModel( {
                username,
                email,
                password: hashPassword,
                // image: image
            } )
            // console.log( "find data", userData );
            if ( userData ) {
                userData.save()
                let result = userData.toObject();
                delete result.password;
                let token = jwt.sign( { id: userData._id }, process.env.JWT_SCRETE_KEY, {
                    expiresIn: "1d"
                } )
                res.cookie( 'jwt_token', token, { httpOnly: true } );
                // res.send({ message: `user login success` })

                res.status( 201 ).json( { mesage: 'user create success', status: true, data: result, token: token } )
            }
        }


    } catch ( error ) {
        console.log( error )
        res.status( 500 ).json( { message: error, status: false } )
    }
}

exports.searchuser = async ( req, res ) => {
    try {
        const { search } = req.body
        // console.log( req.user.id )
        const findData = await userModel.find( {
            username: { $regex: search, $options: 'i' },
            _id: { $nin: [ req.user.id ] }
        } )
        // console.log(findData, "finddata");
        if ( findData.length ) {
            return ( res.status( 200 ).send( {
                status: true,
                data: findData
            } ) )
        }
        res.status( 200 ).send( {
            status: false,
            data: [],
            msg: "data not found"
        } )

    } catch ( error ) {
        console.log( error )
        res.status( 500 ).json( { message: error, status: false } )
    }
}
exports.socketConnection = async ( req, res ) => {
    try {
        res.send( 'connection success' )

    } catch ( error ) {
        console.log( error )
    }
}

exports.userLogin = async ( req, res ) => {
    const { password, email } = req.body
    // console.log( email, password )
    // let errors = validation(req.body);

    // if (!password || !email) {
    //     res.status(409).json({ "message": `Please enter ${errors}` })

    // }
    try {
        const data = await userModel.findOne( { email } )
        if ( data ) {
            const comperPassword = await bcrypt.compare( password.toString(), data.password )
            if ( comperPassword == true ) {
                let token = jwt.sign( { id: data._id }, process.env.JWT_SCRETE_KEY, {
                    expiresIn: "1d"
                } )
                res.cookie( 'jwt_token', token, { httpOnly: true } );
                res.send( { message: `user login success`, data: data, token: token, status: true } )
            } else {
                res.status( 406 ).json( { "message": "Invalid Password", status: false } )
            }

        } else {
            res.status( 406 ).json( { 'message': 'Invalid credentials', status: false } )
        }

    } catch ( error ) {
        console.log( error, "err" )
        res.status( 500 ).json( { message: error.error } )
    }

}