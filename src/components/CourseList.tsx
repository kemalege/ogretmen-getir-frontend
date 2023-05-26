import React, {useEffect, useState} from "react";
import { useGetAllCoursesQuery, useGetCourseBySearchQuery } from "../features/course/courseApiSlice";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser, selectCurrentUsersId } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

const CourseList = () => {

  const [searchParams] = useSearchParams();
  const param1 = searchParams.get('search')

  const [showParamData, setShowParamData] = useState(true);

  const {data: courseList, isLoading, isSuccess, isError, refetch, error} = useGetAllCoursesQuery();
  const {data: filteredCourseList} = useGetCourseBySearchQuery(param1!);

  const currentUsersId = useSelector(selectCurrentUsersId)
  const token = useSelector(selectCurrentToken)

  let courses = courseList?.data

  const handleRefetchData = async() => {
    try {
      await refetch().unwrap()
    } catch (err:any) {
      if(err?.status === 401){      
        toast(err?.data?.message)
      }
    }
  }
  useEffect(() => {
    handleRefetchData()
  },[])

  console.log(courses)

  useEffect(() => {
    setShowParamData(Boolean(param1));
  }, [param1]);

  if(showParamData){
    courses = filteredCourseList?.data
  }

  let content
  let enrollmentCount

  if(isLoading) {
    content = <p>Loading...</p>
  }
  else if(isSuccess) {
    content = (courses)?.map(course => {
      enrollmentCount = course.students.length
      return (
        <article className="flex basis-1/1 md:basis-1/3 lg:basis-1/4 " key={course._id}>
          <div className="flex flex-col shadow-lg rounded-t m-2">
            <img
              className="object-cover rounded-t"
              src="https://res.cloudinary.com/djhvhao4u/image/upload/v1684657398/page_images/online_lessons_zcidrj.jpg"
              alt=""
            />
            <div className="py-2 px-2">
              <h3 className="text-getir-green">Instructor {course.instructor.name}</h3>
              <h5 className="text-getir-green">{course.class}</h5>
              <h5 className="text-getir-green">{course.subject}</h5>
              <p className="text-sm text-gray-500">Quota {enrollmentCount}/{course.quota}</p>
              <p className="text-sm text-gray-500">Description {course.description}</p>
            </div>
            <div className="flex md:justify-end lg:justify-end p-2 h-full items-end">
              {course.students.includes(currentUsersId) && token? <button className="bg-gray-400 text-white py-1 px-2 rounded-md w-full md:w-fit lg:w-fit text-center hover:cursor-auto">Already Enrolled</button> :
              <Link to={`/course-details/${course._id}`} className="bg-getir-green text-white py-1 px-2 rounded-md w-full md:w-fit lg:w-fit text-center">Enroll Now</Link> }
              
            </div>
            
          </div>
        </article>
      )
    })
  }else if(isError) {
    // content = <p>{error}</p>
  }
  return <section className="flex flex-wrap md:flex-row lg:flex-row my-2 mx-4">{content}</section>
};

export default CourseList;
