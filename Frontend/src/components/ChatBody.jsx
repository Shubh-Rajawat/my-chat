import React, { useEffect, useState } from 'react'
import { BsEmojiSmileUpsideDown } from "react-icons/bs"
import bckimg from "../assets/image/dark-blue-plain-wall-background.jpg"
import Header from './Header'
import 'emoji-picker-element';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import BaseUrl from '../BaseUrl';
import axios from 'axios';
import Cookies from 'js-cookie';
import { currentFriendAction } from '../redux/slices/FriendsSlice';
import { chatActions } from '../redux/slices/ChatSlice';
import { io } from "socket.io-client";
import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    Categories,
    EmojiClickData,
    Emoji,
    SuggestionMode,
    SkinTonePickerLocation
} from "emoji-picker-react";
import { AiOutlineCloseCircle } from 'react-icons/ai';


const ChatBody = () => {
    const socket = io( BaseUrl );
    const { currentFriend, friendConvoId } = useSelector( ( state ) =>
        state.FriendsData
    );
    const { chatMessages } = useSelector( ( state ) =>
        state.chatMessages
    );
    const dispatch = useDispatch();
    const userData = JSON.parse( Cookies.get( 'emt' ) );
    const [ inputChat, setInputChat ] = useState( "" );
    const [ showEmojiBox, setShowEmojiBox ] = useState( false )
    const [ chatItem, setChatItem ] = useState( [] )
    // check isFriend
    const checkFriend = ( item ) => {
        axios.post( `${ BaseUrl }fatch-all-msg`, {
            chatType: "personal",
            senderid: userData?._id,
            reciever_id: item?._id,
            friendsAndConversationId: item?.friendsAndConversationId
        } ).then( ( res ) => {
            // console.log( "chatbody isFriend", res?.data.friend )
            dispatch( chatActions.setchatMessages( res?.data?.data ) );
            dispatch( currentFriendAction.setIsFriend( res?.data?.friend?.friend ) );
            setChatItem();
        } )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();
        if ( inputChat ) {
            // setChatItem( [ ...chatItem, inputChat ] );
            axios.post( `${ BaseUrl }msg-create`, {
                friendsAndConversationId: friendConvoId,
                sender_id: userData?._id,
                chatType: "personal",
                reciever_id: currentFriend?._id,
                textmessage: inputChat,
                chatGroupId: ""
            } ).then( res => {
                console.log( "sending", res?.data?.data )
                let data = {
                    reciver_id: currentFriend?._id,
                    data: res?.data?.data,
                    friend: { sender: true, friend: true },
                };
                socket.emit( "send-msg", data );
                let newMsg = {
                    it: res?.data?.data,
                    me: true,
                }
                dispatch( chatActions.pushMessage( newMsg ) );
            } )
            setInputChat( "" );
        } else {
            setInputChat( "" );
        }
    }
    // function to handle sender's chat//
    const handleChats = ( i ) => {
        const filter = chatItem.filter( ( item ) => {
            return item !== chatItem[ i ];
        } )
        setChatItem( filter );
    }
    const { isFriend } = useSelector( ( state ) =>
        state.FriendsData
    );

    const sendFriendRequest = () => {
        axios.post( `${ BaseUrl }send-friend-request`, {
            friend_id: currentFriend?._id,
            sender_Id: userData?._id,
        } ).then( res => {
            console.log( `say hi`, res?.data )
        } )
    }
    const acceptFriendRequest = () => {
        axios.post( `${ BaseUrl }accepted-friend-request`, {
            friend_id: currentFriend?._id,
            sender_Id: userData?._id,
        } ).then( res => {
            if ( res?.data?.status ) {
                console.log( `accept`, res?.data )
                checkFriend( currentFriend )
            }
        } )
    }
    const emojiClick = ( emojiData, event ) => {
        setInputChat(
            ( inputChat ) =>
                inputChat + ( emojiData.isCustom ? emojiData.unified : emojiData.emoji )
        );
    }

    return (
        <>
            <div>
                <Header />
                <div className='body-wrapper' >
                    { isFriend == true ?
                        <div className="chats">
                            <div className="msg-main">
                                {
                                    chatMessages ?

                                        chatMessages && chatMessages.map( ( item, index ) => {
                                            return (
                                                <div key={ index } className={ item?.me ? `chat-right ` : `chat-left` }>
                                                    <div className={ item?.me ? `msgg1` : `msgg` }>
                                                        <h4>{ item?.it?.message?.textmessage }</h4>
                                                    </div>
                                                </div>
                                            )
                                        } )
                                        : "No Chat messages"
                                }
                            </div>

                        </div> :
                        ( isFriend?.reciver && isFriend?.pending ?

                            <div className="requesting">
                                <div className="">
                                    <p>Accept request from { currentFriend?.username }</p>
                                    <Button label={ `Accept` } style={ {
                                        backgroundColor: "#7269ef",
                                        borderColor: "#7269ef",
                                        outline: "none",
                                        color: "#fff"
                                    } } rounded
                                        onClick={ acceptFriendRequest }
                                    />

                                </div>
                            </div>
                            : <div className="requesting">
                                <div className="">
                                    <p>You're not Friends🤝 with { currentFriend?.username }</p>
                                    <Button label={ `Say hi👋` } style={ {
                                        backgroundColor: "#7269ef",
                                        borderColor: "#7269ef",
                                        outline: "none",
                                        color: "#fff"
                                    } } rounded
                                        onClick={ sendFriendRequest }
                                    />

                                </div>
                            </div> )
                    }
                    <div className="chat-input-wrap">
                        <form onSubmit={ handleSubmit } >
                            { showEmojiBox && <div className="emojiBox">
                                <span className='emojiCloseButton' onClick={ () => {
                                    setShowEmojiBox( false )
                                } }><AiOutlineCloseCircle /></span>
                                <EmojiPicker
                                    onEmojiClick={ emojiClick }
                                    autoFocusSearch={ false }
                                />
                            </div> }
                            <div className="chat-input">
                                <div className="svg emoji" onClick={ () => {
                                    setShowEmojiBox( !showEmojiBox )
                                } } > <BsEmojiSmileUpsideDown />
                                </div>
                                <input type="text" name="chat" id="chat"
                                    autoComplete="off"
                                    placeholder='Type message'
                                    value={ inputChat }
                                    onChange={ ( e ) => { setInputChat( e.target.value ) } }
                                />
                                <button type='submit' className='send-btn'>send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ChatBody;
