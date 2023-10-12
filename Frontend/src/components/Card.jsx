import React from 'react'
import avatar from '../assets/image/avatar.svg'
const Card = ( props ) => {
    return (

        <div className="card">
            <div className="additional">
                <div className="user-card">
                    <img src={ avatar } alt="" width="90" height="50" className='center' />
                </div>
            </div>
            <div className="general">
                <h4 className='name' >{ props.data.username }</h4>
                <p className="more" >status</p>
            </div>
        </div>


    )
}

export default Card