import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice( {
    name: "Chats",
    initialState: {
        chatMessages: null,

    },
    reducers: {
        setchatMessages: ( state, action ) => {
            state.chatMessages = action.payload;
        },
        pushMessage: ( state, action ) => {
            state.chatMessages = [ ...state.chatMessages, action.payload ]
        },
    }
} )


export const chatActions = ChatSlice.actions;
const chatReducer = ChatSlice.reducer;
export default chatReducer;