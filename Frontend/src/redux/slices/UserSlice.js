import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice( {
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: ( state, action ) => {
            state.user = action.payload;
        }
    }
} )

export const currentUserAction = UserSlice.actions
const currentUserReducer = UserSlice.reducer;
export default currentUserReducer;