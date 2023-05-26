import React from "react";
import defAvatar from "../assets/images/defAvatar.svg";
import { useGetAllInstructorsQuery } from "../features/users/userApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faCircleNotch, faUser } from "@fortawesome/free-solid-svg-icons";
import Star from "./Star";

const InstructorList = () => {
  const {
    data: instructorsResponse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllInstructorsQuery();

  const instructors = instructorsResponse?.data

  let content;

  if (isLoading) {
    content = <FontAwesomeIcon className="" icon={faCircleNotch} spin size="xl" />
  } else if (isSuccess) {
    content = instructors?.map(instructor => {

        const totalStars = instructor.ratings?.reduce(
        (accumulator, ratingObject) => accumulator + ratingObject?.star,0) ?? 0

        const rateCount = instructor.ratings?.length
        
        let avgRating = 0
        if (rateCount && rateCount !== 0) {
            avgRating = totalStars / rateCount;
        }
        return (
        <div key={instructor._id} className="max-w-3xl w-full mx-auto z-10">
        <div className="flex flex-col">
            <div className="bg-white border border-white shadow-lg  rounded-3xl p-4 m-4">
                <div className="flex-none sm:flex">
                    <div className=" relative h-32 w-32   sm:mb-0 mb-3">
                        <img src={instructor.profile_image?.url || defAvatar} alt="userAvatar" className=" w-32 h-32 object-cover rounded-2xl"/>
                        
                    </div>
                    <div className="flex-auto sm:ml-5 justify-evenly">
                        <div className="flex items-center justify-between sm:mt-2">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">{instructor?.name} {instructor?.surname}</div>
                                    <div className="flex-auto text-gray-500 my-1">
                                        <span className="mr-3 ">{instructor.department}</span><span className="mr-3 border-r border-gray-200 max-h-0"></span><span>{instructor?.place}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center">
                            <div className="flex items-center">
                                <Star stars={avgRating} reviews={rateCount}/> 
                                <span className="ml-2 text-sm text-gray-500">{rateCount} reviews</span>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    className="h-5 w-5 text-yellow-500">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                                
                                */}
                            </div>
                            
                            </div>
                            <div className="flex pt-2  text-sm text-gray-500">
                                <div className="flex-1 inline-flex items-center">
                                    <FontAwesomeIcon className="h-5 w-4 mr-2" icon={faUser} />
                                    <p className="">{instructor.about}</p>
                                </div>
                                <div className="flex-1 inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                    <p className="">{instructor.courses?.length}</p>
                                </div>
                                <button  className="flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-getir-300 hover:border-getir-green-500 text-white rounded-full transition ease-in duration-300">FOLLOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
        })
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-instructor-pattern bg-center bg-cover">
      {/* <div className="absolute bg-black opacity-80 inset-0 z-0"></div> */}
      {content}
    </div>
  );
};
export default InstructorList;
