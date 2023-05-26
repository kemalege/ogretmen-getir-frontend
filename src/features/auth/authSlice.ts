import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AuthResponse {
    success: boolean
    access_token: string
    data: UserData
}
interface UserData {
    name: string | null;
    role: string | null;
    _id: string | null;
    profile_image : string
  }
  
interface AuthState {
    user: string | null,
    token: string | null
    role: string | null;
    id: string | null
    avatar: string
}  
  const initialState: AuthState = {
    id: null,
    user: null,
    token: null,
    role: null,
    avatar: ""
  };

const authSlice = createSlice({
    
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            const { data, access_token } = action.payload
            state.id = data._id
            state.user = data.name
            state.role = data.role
            state.token = access_token
            state.avatar = data.profile_image
        },
        registerUser: (state, action: PayloadAction<AuthResponse>) => {
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

export const selectCurrentUsersId = (state:{ auth: AuthState }) => state.auth.id
export const selectCurrentUserRole = (state:{ auth: AuthState }) => state.auth.role
export const selectCurrentUser = (state:{ auth: AuthState }) => state.auth.user
export const selectCurrentToken = (state:{ auth: AuthState }) => state.auth.token
export const selectCurrentProfileImage = (state:{ auth: AuthState }) => state.auth.avatar