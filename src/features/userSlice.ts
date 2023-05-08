import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    data: null
    loading: boolean
    error: string
}

const initialState: UserState = {
    data: null,
    loading: false,
    error:""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {}

})
export default userSlice.reducer