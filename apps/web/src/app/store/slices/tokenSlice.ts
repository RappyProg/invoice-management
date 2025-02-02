import { createSlice } from "@reduxjs/toolkit";

interface Token{
    detail: string
}

interface TokenState {
    token: Token | null;
}

const initialState: TokenState ={
    token: null
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        dispatchToken: (state, action) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = null;
        },
    },
});

export const {dispatchToken, clearToken} = tokenSlice.actions
export default tokenSlice.reducer;