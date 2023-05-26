import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CourseData } from "../features/types/courseType";
import { toast } from "react-hot-toast";
import { useCreateCourseMutation } from "../features/course/courseApiSlice";
import { dateCombiner } from "../utils/date/dateCombiner";

const CreateCourse = () => {

    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  const [course, setCourse] = useState({});
  const [courseDate, setCourseDate] = useState<null | string>();
  const [courseTime, setCourseTime] = useState<null | string>();

  const [createCourse] = useCreateCourseMutation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setCourse({ ...course, [fieldName]: fieldValue });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value;
    setCourseDate(fieldValue)
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value;
    setCourseTime(fieldValue)
  };
  // console.log(courseDate, courseTime)

  const combinedDate = dateCombiner(courseDate, courseTime)
  
  useEffect(()=>{
    setCourse({...course, courseDate: combinedDate})
  },[courseDate, courseTime])

  console.log(combinedDate)
  
  const handleCreateForm = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
        const payload = await createCourse(course).unwrap()
        console.log(payload)
        toast("Course succesfully created")
    } catch (err:any) {
        console.log(err)
    }
  }    
  return (
    <section className="font-mono bg-gray-400">
      {/* <!-- Container --> */}
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* <!-- Row --> */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* <!-- Col --> */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            
            > <img src="https://source.unsplash.com/Mv9hjnEUHR4/600x800" alt="" /></div>
           
            {/* <!-- Col --> */}
            
            <div className="flex items-center justify-center p-12">
            
            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={handleCreateForm}>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                        htmlFor="class"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                        Class
                        </label>
                        <input
                        type="text"
                        onChange={handleInputChange}
                        name="class"
                        id="class"
                        placeholder="Class"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                        htmlFor="subject"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                        Subject
                        </label>
                        <input
                        type="text"
                        onChange={handleInputChange}
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    </div>
                </div>
                <div className="mb-5">
                    <label
                    htmlFor="description"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Description
                    </label>
                    <input
                    type="text"
                    onChange={handleInputChange}
                    name="description"
                    id="description"
                    placeholder="About course"
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>

                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                        htmlFor="courseDate"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                        Date
                        </label>
                        <input
                        type="date"
                        onChange={handleDateChange}
                        name="courseDate"
                        id="courseDate"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                        htmlFor="time"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                        Time
                        </label>
                        <input
                        type="time"
                        onChange={handleTimeChange}
                        name="time"
                        id="time"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    </div>
                </div>
                {/* <div className="mb-5">
                    <label
                    htmlFor="location"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Location
                    </label>
                    <input
                    type="location"
                    onChange={handleInputChange}
                    name="location"
                    id="location"
                    placeholder="Location"
                    min="0"
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div> */}
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                        htmlFor="courseFee"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                        Fee
                        </label>
                        <input
                        type="courseFee"
                        onChange={handleInputChange}
                        name="courseFee"
                        id="courseFee"
                        placeholder="Fee"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                        htmlFor="quota"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                        Quota
                        </label>
                        <input
                        type="number"
                        onChange={handleInputChange}
                        name="quota"
                        id="quota"
                        placeholder="Quota"
                        min="0"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    </div>
                </div>
                
                

                <div>
                    <button
                    className="hover:shadow-htmlForm rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCourse;
