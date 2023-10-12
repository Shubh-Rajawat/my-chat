const mongoose = require( 'mongoose' )
const uri = 'mongodb+srv://Shubh-Rajawat:Shubh9414@cluster0.xpiuosr.mongodb.net/chat?retryWrites=true&w=majority'

const db = () => {
    mongoose.connect( uri, {
    } ).then( ( res ) => {
        console.log( 'database conection success' )
    } ).catch( ( err ) => {
        console.log( err )
    } )
}

module.exports = db