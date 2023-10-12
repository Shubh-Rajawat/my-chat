const express = require( 'express' )
const { messageCreate, deletemessage, fetchAllmessages, deleteAllchatmessagesPersonalchat } = require( '../controller/chat/message' )
const { sendFriendRequest, accepectFriendRequest, rejectFriendRequest, fetchFriendList } = require( '../controller/chat/friendsAndConversation' )
const { userUnBlock, createblockUser, getsingleBlockUser } = require( '../controller/chat/blockUser' )
const { createGroupAndAddmember, addNewgroupMembers, removegroupMembers, fetchGroupList, fetchGroupingMembers, groupChatDelete } = require( '../controller/chat/chatGroup' )
const { userSingup, searchuser, userLogin } = require( '../controller/user/user.controller' )

const uplode = require( '../middleware/uplode' )
const { userAuth } = require( '../middleware/auth' )
const router = express.Router()

//--------------- 

router.route( '/user-login' ).post( userLogin )
router.post( "/crete-user", uplode.single( 'image' ), userSingup )
router.post( "/search-user", userAuth, searchuser )


//---------------------
router.post( "/send-friend-request", sendFriendRequest )
router.post( "/accepted-friend-request", accepectFriendRequest )
router.post( "/block-friend-request", rejectFriendRequest )
router.post( "/fetch-friend-list", fetchFriendList )
// router.post("/send-friend-accpect",rejectFriendRequest)


router.post( "/msg-create", uplode.array( 'file', 6 ), messageCreate )
router.post( "/user-unblock", userUnBlock )
router.post( "/user-block", createblockUser )
router.post( "/get-block-user", getsingleBlockUser )
router.post( "/msg-remove", deletemessage )
router.post( "/fatch-all-msg", fetchAllmessages )
router.post( "/msg-remove-all-personal-chat", deleteAllchatmessagesPersonalchat )

//  ---------   Group ---------   ////
router.post( "/create-new-group", uplode.single( 'groupImage' ), createGroupAndAddmember )
router.post( "/add-new-group-members", addNewgroupMembers )
router.post( "/remove-group-members", removegroupMembers )
router.post( "/fetch-group-list", fetchGroupList )
router.post( "/fetch-group-members", fetchGroupingMembers )
router.post( "/delete-group-chat", groupChatDelete )

module.exports = router