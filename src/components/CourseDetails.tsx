import React from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useGetCourseDetailsQuery } from "../features/course/courseApiSlice";
import { CourseData } from "../features/types/courseType";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToCart } from "../features/cart/cartSlice";
import { selectCurrentUsersId } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

const CourseDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: courseDetails,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCourseDetailsQuery(id!);

  const course = courseDetails?.data;
  const courseDate = course?.courseDate ?? "";
  const dt = new Date(courseDate);
  let month = 1;
  month = month + dt?.getMonth();

  let date = dt?.getDate() + "-" + month + "-" + dt?.getFullYear();
  let time = dt?.getHours() + ":" + dt?.getMinutes();

  const handleNavigateCheckout = () => {
      dispatch(addCourseToCart({ id }));
      navigate(`/cart/checkout/express/course/${id}`, {
      state: { from: location },
    });
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block">
          <img
            className="w-full"
            alt="image of a girl posing"
            src="https://res.cloudinary.com/djhvhao4u/image/upload/v1682672669/pexels-anastasiya-gepp-1462630_gmz8hl.jpg"
          />
          {/* buraya harita gelecek */}
        </div>

        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="leading-none text-gray-600 dark:text-gray-600 ">
              Course Details
            </p>
            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
              Balenciaga Signature Sweatshirt
            </h1>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
              Instructor
            </p>
            <div className="flex items-center justify-center">
              <p className="leading-none text-gray-600 dark:text-gray-600">
                {course?.instructor.name}
              </p>
            </div>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
              Class
            </p>
            <div className="flex items-center justify-center">
              <p className="leading-none text-gray-600 dark:text-gray-600">
                {course?.class}
              </p>
              {/* <div className="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 cursor-pointer"></div> */}
              {/* <svg className="cursor-pointer text-gray-300 dark:text-white" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg> */}
            </div>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
              Subject
            </p>
            <div className="flex items-center justify-center">
              <p className="leading-none text-gray-600 dark:text-gray-600">
                {course?.subject}
              </p>
              {/* <svg className="text-gray-300 dark:text-white cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg> */}
            </div>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
              Description
            </p>
          </div>
          <div>
            <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-600 mt-7">
              {course?.description}
            </p>
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
                Location
              </p>
              <div className="flex items-center justify-center">
                <p className="leading-none text-gray-600 dark:text-gray-600">
                  Location datası eklenecek
                </p>
              </div>
            </div>
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
                Quota
              </p>
              <div className="flex items-center justify-center">
                <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-600">
                  {course?.enrollmentCount}/{course?.quota}
                </p>
              </div>
            </div>
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
                Course Date{" "}
              </p>
              <div className="flex items-center justify-center">
                <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-600">
                  {date}
                </p>
              </div>
            </div>
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
                Course Time{" "}
              </p>
              <div className="flex items-center justify-center">
                <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-600">
                  {time}
                </p>
              </div>
            </div>
            <div className="py-4 flex items-center justify-between">
              <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
                Created At
              </p>
              <div className="flex items-center justify-center">
                <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-600">
                  {course?.createdAt.toString()}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="border-t border-b py-4 mt-7 border-gray-200">
              <div
                data-menu
                className="flex justify-between items-center cursor-pointer"
              >
                <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
                  Terms of Service
                </p>
                <button
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                  role="button"
                  aria-label="show or hide"
                >
                  <svg
                    className="transform text-gray-300 dark:text-white"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L5 5L1 1"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-600"
                id="sect"
              >
                You will be responsible for paying for your own shipping costs
                for returning your item. Shipping costs are nonrefundable
              </div>
            </div>
          </div>
          <div>
            <div className="border-b py-4 border-gray-200">
              <div
                data-menu
                className="flex justify-between items-center cursor-pointer"
              >
                <p className="text-base leading-4 text-gray-800 dark:text-gray-600">
                  Contact
                </p>
                <button
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                  role="button"
                  aria-label="show or hide"
                >
                  <svg
                    className="transform text-gray-300 dark:text-white"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L5 5L1 1"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-600"
                id="sect"
              >
                If you have any questions on how to return your item to us,
                contact us.
              </div>
            </div>
          </div>
          <div className="flex md:justify-end lg:justify-end p-2">
            {/* <Link onClick={handleNavigateCheckout} state={{ from: location }} className="bg-getir-green text-white py-1 px-1 rounded-md w-full md:w-24 lg:w-24 text-center">Enroll Now</Link> */}
            <button
              onClick={handleNavigateCheckout}
              className="bg-getir-green text-white py-1 px-1 rounded-md w-full md:w-24 lg:w-24 text-center"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    );
  } else if (isError) {
    // if ('success' in error) {
    //   content = <p>{error}</p>
    // }
  }
  return <div>{content}</div>;
};

export interface courseResponse {
  success: boolean;
  data: CourseData;
}
export default CourseDetails;
