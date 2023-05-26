import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

import { Link, useLocation, Navigate, Outlet, useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentProfileImage, selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";
import { useGetCourseBySearchQuery } from "../features/course/courseApiSlice";

const MainPage = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  const handleSearch = () => {
    if (searchText && searchText.trim().length!==0) {
      navigate(`courses?search=${searchText}`);
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchText && searchText.trim().length!==0) {
      navigate(`courses?search=${searchText}`);
    }
  };
  // const [showMenu, setShowMenu] = useState<boolean>(false);

  // const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {  
  //   e.preventDefault()
  //   try {
  //     const payload = await logout({})
  //     console.log(payload)
  //     dispatch(logOut())
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  
  return (
    <section className="flex flex-col ">
      
      <header className="flex h-16 bg-getir-green justify-center">
        <div className="flex text-black justify-center">
          <div className="flex hover:bg-[#5e9100] hover:text-white items-center px-4">
            <Link to="/" className="hover:text-white">Home</Link>
          </div>
          <div className="flex hover:bg-[#5e9100] hover:text-white items-center px-4">
            <Link to="/courses" className="hover:text-white">Courses</Link>
          </div>
          <div className="flex hover:bg-[#5e9100] hover:text-white items-center px-4">
            <Link to="/instructors" className="hover:text-white">Instructors</Link>
          </div>
          <div className="flex hover:bg-[#5e9100] hover:text-white items-center px-4">
            <Link to="/" className="hover:text-white">Contact</Link>
          </div>
            
        </div>
      </header>
      <div className="flex relative">
        
        <div className="flex-row absolute inset-x-0 w-3/4 md:w-2/5 mx-auto top-32">
          <h1 className="flex md:text-3xl lg:text-5xl text-white justify-center">Let Me Do It For You?</h1>
          <h3 className="flex md:text-xl lg:text-3xl text-white text-center my-4">This is the address of quality education in every field with experts in their fields.</h3>
          <div className="flex lg:mx-20">
            <input onKeyDown={handleKeyDown} type="text" id="search" value={searchText} onChange={handleSearchInput} placeholder="Search an activity" className="flex w-full py-3 pl-5 outline-none shadow-xl rounded-l-full"/>
            <button onClick={handleSearch} className="flex rounded-r-full items-center justify-center w-16 bg-getir-green text-white shadow-xl"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
          </div>  
        </div>
        
        <img className="object-cover w-screen h-128" src="https://res.cloudinary.com/djhvhao4u/image/upload/v1684657397/page_images/search-box_ayoubz.jpg" alt=""/>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row my-8">
          <h1 className="">Where are you lacking?</h1>
          <h1 className="text-getir-green">Any course</h1>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="flex lg:flex-col shadow-lg rounded-t m-2 basis-3/4 md:basis-2/5 lg:basis-1/4">
            <img className="object-cover w-fit lg:w-56 h-28 rounded-t" src="https://res.cloudinary.com/djhvhao4u/image/upload/v1684657397/page_images/school-support_qrowjs.jpg" alt=""/>
            <div className="my-2 mx-2">
              <h5 className="text-getir-green">School Support</h5>
              <p className="text-sm text-gray-500">45345 teachers</p> 
            </div>
          </div>
          <div className="flex lg:flex-col shadow-lg rounded-t m-2 basis-3/4 md:basis-2/5 lg:basis-1/4">
            <img className="object-cover w-fit lg:w-56 h-28 rounded-t" src="https://res.cloudinary.com/djhvhao4u/image/upload/v1684657396/page_images/music-lessons_ogfcbj.jpg" alt=""/>
            <div className="my-2 mx-2">
              <h5 className="text-getir-green">Music Lessons</h5>
              <p className="text-sm text-gray-500">45345 teachers</p> 
            </div>
          </div>
          <div className="flex lg:flex-col shadow-lg rounded-t m-2 basis-3/4 md:basis-2/5 lg:basis-1/4">
            <img className="object-cover w-fit lg:w-56 h-28 rounded-t" src="https://res.cloudinary.com/djhvhao4u/image/upload/v1684657397/page_images/language-lessons_msgxts.jpg" alt=""/>
            <div className="my-2 mx-2">
              <h5 className="text-getir-green">Language Lessons</h5>
              <p className="text-sm text-gray-500">45345 teachers</p> 
            </div>
          </div>
          <div className="flex lg:flex-col shadow-lg rounded-t m-2 basis-3/4 md:basis-2/5 lg:basis-1/4">
            <img className="object-cover w-fit lg:w-56 h-28 rounded-t" src="https://res.cloudinary.com/djhvhao4u/image/upload/v1684657398/page_images/online_lessons_zcidrj.jpg" alt=""/>
            <div className="my-2 mx-2">
              <h5 className="text-getir-green">Online Lessons</h5>
              <p className="text-sm text-gray-500">45345 teachers</p> 
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      
    </section>
  );
};

export default MainPage;
