import { createSlice } from "@reduxjs/toolkit";

interface Personnel{
    id: number
    name: string
    email: string
    invoices?: Array<{
        id: number
        client_id: number
        total: number
        status: string
        dueDate: string
        createdAt: string
    }>
}

interface Logs{
    active: boolean
}

interface PersonnelState {
    profile: Personnel | null;
    logs: Logs | null;
}

const initialState: PersonnelState = {
    profile: null,
    logs: null,
};

export const personnelSlice = createSlice({
    name: 'personnel',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        clearProfile: (state) => {
            state.profile = null;
        },
        loggingIn:(state) =>{
            state.logs = {active: true}
        },
        loggingOut:(state) =>{
            state.logs = {active: false}
        }
    },
});

export const { setProfile, clearProfile, loggingIn, loggingOut } = personnelSlice.actions;
export default personnelSlice.reducer;