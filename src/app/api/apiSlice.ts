import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'
import { RootState } from '../store'

const baseQueryy = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    //credentials: 'include', // kimlik bilgilerinin her requestte cookie ile birlikte gönderilmesini sağlar
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        console.log(getState())
        if (token) {
            headers.set("authorization", `Bearer: ${token}`)      
        }
        return headers
    }
})


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryy,
    endpoints: builder => ({})
})