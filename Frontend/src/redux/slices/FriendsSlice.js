import { createSlice } from "@reduxjs/toolkit";

const FriendsSlice = createSlice( {
    name: "Friends",
    initialState: {
        currentFriend: null,
        isFriend: null,
        friendConvoId: null,
    },
    reducers: {
        setCurrentFriend: ( state, action ) => {
            state.currentFriend = action.payload;
        },
        setIsFriend: ( state, action ) => {
            state.isFriend = action.payload;
        },
        setFriendConvoId: ( state, action ) => {
            state.friendConvoId = action.payload;

        },
    }
} )

export const currentFriendAction = FriendsSlice.actions
const currentFriendReducer = FriendsSlice.reducer;
export default currentFriendReducer;