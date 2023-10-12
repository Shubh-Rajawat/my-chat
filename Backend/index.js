const express = require( 'express' )
const app = express()
const path = require( 'path' )
require( 'dotenv' ).config()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9000
const route = require( './routes/routes' )
const db = require( './config/db' )
const cors = require( 'cors' )

db()
app.use( cors( {
    origin: "*"
} ) )
app.use( "/uplode", express.static( "uplode" ) );
// app.use("/file", express.static("uplode"));
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.get( '/', ( req, res ) => {

    res.sendFile( 'index.html', { root: __dirname } );
} );

app.use( '/', route )
const server = app.listen( port, () => {
    console.log( `server started`, port );
} )

const io = require( 'socket.io' )( server, {
    cors: {
        origin: "*"
    }
} )
const users = new Map()
let onlineuser = []

io.on( "connection", ( socket ) => {
    console.log( "connected", socket.id );
    // Socketserver(socket)
    socket.on( "joinuser", ( data ) => {
        console.log( "hello", data )
        users.set( data.id, { socketid: socket.id } )

        users.forEach( ( user, i ) => {
            // console.log(user,i);
            onlineuser.push( data.id )
        } )
        // socket.to(socket).emit("onlineuser",[...new Set(onlineuser)])
        // console.log([...new Set(onlineuser)]);
        io.emit( "onlineuser", [ ...new Set( onlineuser ) ] )
        // console.log(users);
        if ( onlineuser.length ) {
            onlineuser.forEach( ( it ) => {
                socket.to()
            } )
        }
    } )

    socket.on( "disconnect", ( data ) => {
        onlineuser.length = 0
        users.forEach( ( user, i ) => {
            console.log( "i", i, "socketid", user );
            if ( user?.socketid == socket.id ) {
                users.delete( i )
            }
            // console.log(i,user);
        } )

        users.forEach( ( user, i ) => {
            onlineuser.push( i )
        } )
        io.emit( "onlineuser", [ ...new Set( onlineuser ) ] )
    } )


    socket.on( "send-msg", ( msg ) => {
        // reciverid,sendername,msg:{file,text}
        const socketid = users.get( msg.reciver_id )
        console.log( "message", msg );
        console.log( socketid, users );
        if ( socketid?.socketid ) {
            socket.to( socketid.socketid ).emit( "recive-msg", msg )
        }
    } )
} )
