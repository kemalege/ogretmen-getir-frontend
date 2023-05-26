import { apiSlice } from "../../app/api/apiSlice";
import { IUser, IUserDetails } from "../types/userTypes";

// export interface IProfile {
//     success: boolean;
//     data: IUser; 
// }
export interface IError {
    data:{
        success: boolean;
        message: string;
    } 
    status: Number;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                keepUnusedDataFor: 5
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            })
        }),
        logOut: builder.mutation({
             query: () => ({
                url: '/auth/logout',
                method: 'GET',
            })
        }),
        getToProfile: builder.query<IUserDetails, void>({
            query: () => ({
               url: '/auth/profile',
               method: 'GET',
               keepUnusedDataFor: 10
           })
       }),
       editProfile: builder.mutation({
            query: userDetails => ({
                url: '/auth/edit',
                method: 'POST',
                body: userDetails,
            })
        }),
        uploadPhoto: builder.mutation({
            query: avatar => ({
                url: '/auth/photo',
                method: 'POST',
                body: avatar,
            })
        })
    })
})

export const {
    useLoginMutation, useRegisterMutation, useLogOutMutation, useGetToProfileQuery, useEditProfileMutation, useUploadPhotoMutation, // bu hooklar otomatik olarak oluşturulur. authApiSliceden destructing edilir
} = authApiSlice 