import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { TbPhone } from 'react-icons/tb'
import { BiVideo } from 'react-icons/bi'
import { HiOutlineUser } from 'react-icons/hi'
import { SlOptionsVertical } from 'react-icons/sl'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { ImPhoneHangUp } from 'react-icons/im'
import { Link } from 'react-router-dom'
import avatar from '../assets/image/avatar.svg'
import { useSelector } from 'react-redux'
// import alluserlogo from "../assets/image/alluserlogo.svg"

const Header = () => {
    const { currentFriend } = useSelector( ( state ) =>
        state.FriendsData
    );
    const [ show, setShow ] = useState( false );
    const [ msg, setMsg ] = useState( '' )

    let background = document.body.getElementsByClassName( "chatroom" ).style

    const click = ( msgp ) => {
        setMsg( msgp );
        setShow( true )
    }

    return (
        <>
            <div className="chat-header"  >
                <div className="receiver-info">
                    <div className='receiver-image'>
                        <img src={ avatar } alt="" height="35px" />
                    </div>
                    <span>{ currentFriend ? currentFriend.username : "-----" }</span>
                </div>
                <div className="navtools">
                    <div>
                        <Link className="" onClick={ () => {
                            click( "Start Audio Call" )
                        } } > <TbPhone /> </Link>
                        <Link className="" onClick={ () => {
                            click( "Start Video Call" )
                        } }> <BiVideo /> </Link>

                        <Link className=""> <HiOutlineUser /> </Link>

                        <Link className=""> <SlOptionsVertical /> </Link>
                    </div>
                </div>
            </div>


            { show && ( <div className="modal-wrapper">
                <div className="head">
                    <img src={ avatar } alt="" />
                    <h3>Doris Brown</h3>
                    <p>{ msg }</p>
                    <div className="options">
                        <button className='btn1' onClick={ () => {
                            setShow( false )
                        } }><ImPhoneHangUp /></button>
                        <button className='btn2' ><BsFillTelephoneFill /></button>
                    </div>
                </div>
            </div> ) }

        </>
    )
}

export default Header