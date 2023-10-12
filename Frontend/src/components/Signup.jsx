import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMail, HiOutlineUser } from 'react-icons/hi'
import { MdLockOutline } from 'react-icons/md'
import axios from "axios";
import BaseUrl from '../BaseUrl';
import Cookies from 'js-cookie';
const Signup = () => {
    const [ signupData, setSignupData ] = useState( {
        username: "",
        email: "",
        password: "",
        image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    } )
    const [ show, setShow ] = useState( false )

    const handleSubmit = ( e ) => {
        e.preventDefault();
        axios.post( `${ BaseUrl }crete-user`, signupData )
            .then( res => {
                console.log( res )
            } )
    }
    const pwdToggle = () => {
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
                    <h4>Sign up</h4>
                    {/* <p className='grey' >sign in to continue</p> */ }
                </div>
                <div className="form-cover">
                    <div className="form-wrapper">
                        <form onSubmit={ handleSubmit } >
                            <label htmlFor="name">Name</label>
                            <div className="input-w-icon">
                                <div className="svg"> <HiOutlineUser /></div>
                                <input type="text" name="name" id="name"
                                    autocomplete="off"
                                    value={ signupData.username } onChange={ e => setSignupData( { ...signupData, username: e.target.value } ) }
                                />
                            </div>
                            <label htmlFor="email">Email</label>
                            <div className="input-w-icon">
                                <div className="svg"> <HiOutlineMail /></div>
                                <input type="email" name="email" id="email"
                                    autocomplete="off"
                                    value={ signupData.email } onChange={ e => setSignupData( { ...signupData, email: e.target.value } ) }
                                />
                            </div>
                            <div className="space-btw"><label htmlFor="password">Password</label> </div>
                            <div className="input-w-icon">
                                <div className="svg"><MdLockOutline /></div>
                                <input type={ show ? "text" : "password" } name="password" id="password" autoComplete='off'
                                    value={ signupData.password } onChange={ e => setSignupData( { ...signupData, password: e.target.value } ) }
                                />
                                <span
                                    onClick={ pwdToggle } className='pointer'
                                    aria-selected="false"
                                >{ show ? ( "🙈" ) : ( "🐵" ) }</span>
                            </div>
                            <button type='submit' className='btn'>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
            <p>Already have an account ?  { <Link to="/login">Sign in</Link> }</p>

        </div>

    )
}

export default Signup