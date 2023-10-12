import { configureStore } from '@reduxjs/toolkit'
import currentFriendReducer from './slices/FriendsSlice'
import currentUserReducer from './slices/UserSlice'
import chatReducer from './slices/ChatSlice'

const store = configureStore( {
    reducer: {
        FriendsData: currentFriendReducer,
        userData: currentUserReducer,
        chatMessages: chatReducer
    },
} )

export default store        