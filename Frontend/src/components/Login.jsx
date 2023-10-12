import React, { useState } from 'react'
import "../assets/entrypage.css"
import { Link } from 'react-router-dom'
import { HiOutlineMail } from 'react-icons/hi'
import { MdLockOutline } from 'react-icons/md'
import axios from "axios";
import { useNavigate } from "react-router-dom"
import BaseUrl from '../BaseUrl'
import Cookies from 'js-cookie'
import { currentUserAction } from '../redux/slices/UserSlice'
import { useDispatch } from 'react-redux'
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ loginData, setLoginData ] = useState( {
        email: "",
        password: ""
    } )
    const [ show, setShow ] = useState( false )

    const handleSubmit = ( e ) => {
        e.preventDefault();
        axios.post( `${ BaseUrl }user-login`, loginData )
            .then( ( res ) => {
                if ( res.data.status ) {
                    console.log( "login-page", res );
                    dispatch( currentUserAction.setUser( res.data ) )
                    navigate( "/dashboard" )
                    Cookies.set( `theme`, res.data.token )
                    Cookies.set( `emt`, JSON.stringify( res.data.data ) )
                }
            } )

    }
    const passwordToggle = () => {
        if ( show === true ) {
            setShow( false )
        } else {
            setShow( true )
        }
    }
    return (
        <div className="App-header">
            <div className='login-page-wrapper'>
                {/* <div className='logo' >
                    <BsWhatsapp color='#7325eb' /> <h6 className='p-l'>whatsDown</h6>
                </div> */}
                <div className='heading' >
                    <h4>Sign in</h4>
                    {/* <p className='grey' >sign in to continue</p> */ }
                </div>
                <div className="form-cover">
                    <div className="form-wrapper">
                        <form onSubmit={ handleSubmit } >
                            <label htmlFor="email">Email</label>
                            <div className="input-w-icon">
                                <div className="svg"> <HiOutlineMail /></div>
                                <input type="email" name="email" id="email"
                                    autocomplete="off"
                                    value={ loginData.email } onChange={ e => setLoginData( { ...loginData, email: e.target.value } ) }
                                />
                            </div>
                            <div className="space-btw"><label htmlFor="password">Password</label> <label><Link to='/'>Forgot Password?</Link></label></div>
                            <div className="input-w-icon">
                                <div className="svg"><MdLockOutline /></div>
                                <input type={ show ? "text" : "password" } name="password" id="password"
                                    value={ loginData.password } onChange={ e => setLoginData( { ...loginData, password: e.target.value } ) }
                                />
                                <div
                                    onClick={ passwordToggle } className='pointer tooltip'
                                >{ show ? ( "🙈" ) : ( "🐵" ) } <p class="tooltiptext">{ show ? ( "hide" ) : ( "show" ) }</p></div>
                            </div>
                            <button type='submit' className='btn'>Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
            <p>Don't have an account ?  { <Link to="/">Signup now</Link> }</p>

        </div>
    )
}

export default Login





