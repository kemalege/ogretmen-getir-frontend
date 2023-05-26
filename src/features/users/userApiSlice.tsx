import { apiSlice } from "../../app/api/apiSlice"
import { IUser } from "../types/userTypes"

// apiSlice reducerini extend ederek userApiSlice oluşturuyoruz


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllInstructors: builder.query<IUser,void>({ //getUsers metodu
            query: () => '/users/instructor', //api endpoint
            keepUnusedDataFor: 5, //rtk query default olarak 60 saniye cache eder ancak burada 5 saniye olarak değiştirildi
        })
    })
})

export const {
    useGetAllInstructorsQuery
} = userApiSlice 