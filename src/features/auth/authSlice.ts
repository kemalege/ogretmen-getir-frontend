import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AuthState {
    user: string | null;
    token: string | null;
    avatar : string
  }
  
  const initialState: AuthState = {
    user: null,
    token: null,
    avatar: ""
  };

const authSlice = createSlice({
    
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{data: {name: string, profile_image: string}, access_token: string}>) => {
            const { data, access_token } = action.payload
            state.user = data.name
            state.token = access_token
            state.avatar = data.profile_image
        },
        registerUser: (state, action: PayloadAction<{data: {name: string, profile_image: string}, access_token: string}>) => {
            const { data, access_token } = action.payload
            state.user = data.name
            state.token = access_token
            state.avatar = data.profile_image
        },
        logOut: (state) => {
            state.user = null
            state.token = null
            state.avatar = ""
        },
        updateAvatar: (state, action: PayloadAction<{data: {profile_image: string}}>) => {
            const {data} = action.payload
            state.avatar = data.profile_image
        }
    },
})

export const { setCredentials, registerUser, logOut, updateAvatar } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state:{ auth: AuthState }) => state.auth.user
export const selectCurrentToken = (state:{ auth: AuthState }) => state.auth.token
export const selectCurrentProfileImage = (state:{ auth: AuthState }) => state.auth.avatar