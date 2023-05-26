export interface ICourse {
  success: boolean
  count: number
  pagination: Pagination
  data: CourseData[]
}

export interface ICourseDetails {
  success: boolean
  data: CourseData
}

export interface Pagination {
  previous: Previous
  next: Next
}

export interface Previous {
  page: number
  limit: number
}

export interface Next {
  page: number
  limit: number
}

export interface CourseData {
   _id: string
  class: string
  subject: string
  description: string
  quota: number
  enrollmentCount: number
  instructor: Instructor
  students: any[]
  createdAt: Date
  courseDate: Date
  courseFee: number
  __v: number
}

export interface Instructor {
  _id: string
  name: string
}
