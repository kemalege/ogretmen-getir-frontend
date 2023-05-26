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

const courseSlice = createSlice({
    
    name: 'course',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            
        },
    },
})

export const { setCourses } = courseSlice.actions

export default courseSlice.reducer

// export const selectCurrentUser = (state:{ auth: AuthState }) => state.auth.user
// export const selectCurrentToken = (state:{ auth: AuthState }) => state.auth.token
// export const selectCurrentProfileImage = (state:{ auth: AuthState }) => state.auth.avatar