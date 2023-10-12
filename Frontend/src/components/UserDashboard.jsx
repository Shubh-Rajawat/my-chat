import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import BaseUrl from '../BaseUrl';
import Cookies from 'js-cookie';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { currentFriendAction } from '../redux/slices/FriendsSlice';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';
import { chatActions } from '../redux/slices/ChatSlice';



const UserDashboard = () => {
    const { currentFriend, friendConvoId } = useSelector( ( state ) =>
        state.FriendsData
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ keyword, setKeyword ] = useState( "" );
    const userToken = Cookies.get( `theme` )
    const userData = JSON.parse( Cookies.get( 'emt' ) )
    const [ friendList, setFriendList ] = useState();
    const mutation = useMutation( keyword => {
        return axios.post( `${ BaseUrl }search-user?token=${ userToken }`, { search: keyword.search } )
    } )
    useEffect( () => {
        axios.post( `${ BaseUrl }fetch-friend-list`, {
            userid: userData?._id
        } ).then( res => {
            // console.log( "friendList", res?.data?.data )
            setFriendList( res?.data?.data );
        } )
    }, [] )

    const checkFriend = ( item, fr ) => {
        axios.post( `${ BaseUrl }fatch-all-msg`, {
            chatType: "personal",
            senderid: userData?._id,
            reciever_id: fr ? item?.friend?._id : item?._id,
            friendsAndConversationId: fr ? item?.friend_conversation_id : null,
        } ).then( ( res ) => {
            // console.log( "userdash isFriend", res?.data?.data );
            dispatch( chatActions.setchatMessages( res?.data?.data ) );
            if ( res.data.friend.friend ) {
                dispatch( currentFriendAction.setIsFriend( res?.data?.friend?.friend ) );
            } else {
                dispatch( currentFriendAction.setIsFriend( res?.data?.friend ) );
            }
        } )
    }


    return (
        <div className='userdashboard-wrapper pl-1' >
            <div className="user-header">
                <h3 style={ { color: "#DBE3F1" } } >Chats</h3>
                <Avatar label={ userData?.username[ 0 ] } className="mr-2" size="large" style={ { backgroundColor: '#2196F3', color: '#ffffff' } } shape="circle" />
            </div>
            <form onSubmit={ ( e ) => {
                e.preventDefault();
                mutation.mutate( { search: keyword } )
            } }>
                <div className="search-box">
                    <input type="text" className="search-input" placeholder="Search.." value={ keyword } onChange={ ( e ) => { setKeyword( e.target.value ) } } />
                    <button className="search-button" type='submit' >
                        <i><ImSearch /></i>
                    </button>
                </div>
            </form>
            <div className="users">
                { mutation?.data?.data?.data ? mutation.data.data.data?.map( ( item ) => {
                    return (
                        <div className="" key={ item?.id } onClick={ () => {
                            dispatch( currentFriendAction.setCurrentFriend( item ) );
                            dispatch( currentFriendAction.setFriendConvoId( item?.friend_conversation_id ) );
                            checkFriend( item, false )
                        } }>
                            <Card data={ item } />
                        </div>
                    )
                } )
                    : ( friendList ? friendList?.map( item => {
                        return (
                            <div className="" key={ item?.id } onClick={ async () => {
                                dispatch( currentFriendAction.setCurrentFriend( item?.friend ) );
                                dispatch( currentFriendAction.setFriendConvoId( item?.friend_conversation_id ) )
                                checkFriend( item, true )
                            } }>
                                <Card data={ item?.friend } />
                            </div>
                        )
                    } ) : <h2>No friends</h2> ) }
            </div>
        </div >
    )
}

export default UserDashboard;