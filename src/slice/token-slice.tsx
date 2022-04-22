import { createSlice } from "@reduxjs/toolkit";

interface tokenState {
    access_token: string;
    isLogin: boolean;
}

interface action {
    type?: string;
    payload: tokenState["access_token"];
}

const initialState: tokenState = {
    access_token: "",
    isLogin: false,
};

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        saveToken: (state:tokenState, action:action) => {
            state.access_token = action.payload;
            state.isLogin = true;
        }
    }
});

export const { saveToken } = tokenSlice.actions;
export default tokenSlice.reducer;