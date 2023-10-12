import React, { useState } from 'react'
import '../assets/sidebar.css'
import { BsWhatsapp, BsFillChatDotsFill } from 'react-icons/bs'
import { HiOutlineUser } from 'react-icons/hi'
import { MdPeopleAlt } from 'react-icons/md'
import { TiContacts } from 'react-icons/ti'
import { AiFillSetting } from 'react-icons/ai'
import { CiLight } from 'react-icons/ci'
import { CgProfile } from 'react-icons/cg'
import { NavLink } from 'react-router-dom'
import myuser from '../assets/image/myuser.svg'
import { Sidebar } from 'primereact/sidebar'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

const SideBar = () => {
    const userData = JSON.parse( Cookies.get( 'emt' ) )
    const [ show, setShow ] = useState( false );
    return (
        <>
            <div className='sidebar-wrapper' >
                <aside>
                    <div className="profile">
                        <BsWhatsapp color='#7269ef' />
                    </div>
                    <ul className='side-tools' >
                        <li>
                            <NavLink > <HiOutlineUser /> </NavLink>
                        </li>
                        <li>
                            <NavLink > <BsFillChatDotsFill /> </NavLink>
                        </li>
                        <li>
                            <NavLink > <MdPeopleAlt /> </NavLink>
                        </li>
                        <li>
                            <NavLink > <TiContacts /> </NavLink>
                        </li>
                        <li>
                            <NavLink > <AiFillSetting /> </NavLink>
                        </li>
                    </ul>
                    <div className="profile-tool">
                        <div>
                            <CiLight color='#fff' />
                        </div>
                        <div onClick={ () => {
                            setShow( !show )
                        } } >
                            <CgProfile color='#7269ef' />
                        </div>
                        <Sidebar visible={ show } onHide={ () => setShow( false ) }>
                            <div className='profile-modal' >
                                <img src={ myuser } alt="" height="290px" className='profile-modal-image' />
                                <h3 className='profile-modal-name'>{ userData?.username } </h3>
                                <h4 className='profile-modal'>{ userData?.email }</h4>
                                <h4 className='profile-modal'>Status </h4>
                            </div>
                        </Sidebar>
                    </div>
                </aside>
            </div>

        </>

    )
}

export default SideBar