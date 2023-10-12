import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Protected = ( { Component } ) => {
    const navigate = useNavigate();
    const user = Cookies.get( 'theme' );
    useEffect( () => {
        if ( !user ) {
            navigate( '/login' );
        }
    }, [] )
    return <Component />;
}

export default Protected