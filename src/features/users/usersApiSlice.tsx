import { apiSlice } from "../../app/api/apiSlice"

// apiSlice reducerini extend ederek userApiSlice oluşturuyoruz
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({ //getUsers metodu
            query: () => '/users', //api endpoint
            keepUnusedDataFor: 5, //rtk query default olarak 60 saniye cache eder ancak burada 5 saniye olarak değiştirildi
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice 