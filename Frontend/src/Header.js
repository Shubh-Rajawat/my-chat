import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'

const Header = () => {
    return (
        <div className='header'>
            <div className='logo' >
                <BsWhatsapp color='#7325eb' /><h6 className='p-l'>whatsDown</h6>
            </div>
        </div>
    )
}

export default Header