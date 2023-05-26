import { apiSlice } from "../../app/api/apiSlice";
import { ICourse, ICourseDetails } from "../types/courseType";

export const courseApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                keepUnusedDataFor: 5
            })
        }),
        getAllCourses: builder.query<ICourse, void>({
            query: () => ({
               url: '/course',
               method: 'GET',
               keepUnusedDataFor: 5
           })
       }),
       getCourseDetails: builder.query<ICourseDetails, string>({
            query: (id) => ({
            url: `/course/${id}`,
            method: 'GET',
            keepUnusedDataFor: 5
            })
        }),
        enrollCourse: builder.mutation({
            query: (id) => ({
            url: `/course/${id}/enrol`,
            method: 'POST'
            })
        }),
        
        getCourseBySearch: builder.query<ICourse, string>({
            query: (courseName = '') => ({
            url: `/course?search=${courseName}`,
            method: 'GET',
            keepUnusedDataFor: 0
            })
        }),
        createCourse: builder.mutation({
            query: (courseData) => ({
            url: `/course`,
            method: 'POST',
            body: courseData
            })
        })
    })
})

export const {
    useGetAllCoursesQuery, useGetCourseDetailsQuery, useEnrollCourseMutation, useGetCourseBySearchQuery, useCreateCourseMutation
} = courseApiSlice 