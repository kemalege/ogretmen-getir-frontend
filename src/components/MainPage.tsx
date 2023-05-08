import React, { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

import { Link, useLocation, Navigate, Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentProfileImage, selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";
import ProfileMenu from "./ProfileMenu";
import Dashboard from "./Dashboard";

const MainPage = () => {

  const [searchText, setSearchText] = useState('')
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  const navigate = useNavigate()

  const dispatch = useDispatch();

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
      <Dashboard/>
      <header className="flex h-16 py-4 w-screen bg-getir-green justify-center items-center">
        <div className="flex h-16 text-black space-x-8">
            <button className="hover:bg-getir-green h-full hover:text-white">Home</button>
            <button>Courses</button>
            <button>Instructors</button>
            <button>Contact</button>
        </div>
      </header>
      <div className="flex relative">
        
        <div className="flex-row absolute inset-x-0 w-3/4 md:w-2/5 mx-auto top-32">
          <h1 className="flex md:text-3xl lg:text-5xl text-white justify-center">Let Me Do It For You?</h1>
          <h3 className="flex md:text-xl lg:text-3xl text-white text-center my-4">This is the address of quality education in every field with experts in their fields.</h3>
          <div className="flex lg:mx-20">
            <input type="text" id="search" value={searchText} onChange={handleSearchInput} placeholder="Search an activity" className="flex w-full py-3 pl-5 outline-none shadow-xl rounded-l-full"/>
            <button className="flex rounded-r-full items-center justify-center w-16 bg-getir-green text-white shadow-xl"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
          </div>  
        </div>
        
        <img className="object-cover w-screen h-128" src="https://res.cloudinary.com/djhvhao4u/image/upload/v1682635437/pexels-katerina-holmes-5905557_ucvqnl.jpg" alt=""/>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row my-8">
          <h1 className="">Where are you lacking?</h1>
          <h1 className="text-getir-green">Any course</h1>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="flex lg:flex-col shadow-lg rounded-t m-2 basis-3/4 md:basis-2/5 lg:basis-1/4">
            <img className="object-cover w-fit lg:w-56 h-28 rounded-t" src="https://res.cloudinary.com/djhvhao4u/image/upload/v1682672669/pexels-anastasiya-gepp-1462630_gmz8hl.jpg" alt=""/>
            <div className="my-2 mx-2">
              <h5 className="text-getir-green">School Support</h5>
              <p className="text-sm text-gray-500">45345 teachers</p> 
            </div>
          </div>
          <div className="flex lg:flex-col shadow-lg rounded-t m-2 basis-3/4 md:basis-2/5 lg:basis-1/4">
            <img className="object-cover w-fit lg:w-56 h-28 rounded-t" src="https://res.cloudinary.com/djhvhao4u/image/upload/v1682672715/pexels-rodnae-productions-7502201_qxn6rh.jpg" alt=""/>
            <div className="my-2 mx-2">
              <h5 className="text-getir-green">Music Lessons</h5>
              <p className="text-sm text-gray-500">45345 teachers</p> 
            </div>
          </div>
          <div className="flex lg:flex-col shadow-lg rounded-t m-2 basis-3/4 md:basis-2/5 lg:basis-1/4">
            <img className="object-cover w-fit lg:w-56 h-28 rounded-t" src="https://res.cloudinary.com/djhvhao4u/image/upload/v1682672759/pexels-darya-sannikova-2927599_sxxl9t.jpg" alt=""/>
            <div className="my-2 mx-2">
              <h5 className="text-getir-green">Language Lessons</h5>
              <p className="text-sm text-gray-500">45345 teachers</p> 
            </div>
          </div>
          <div className="flex lg:flex-col shadow-lg rounded-t m-2 basis-3/4 md:basis-2/5 lg:basis-1/4">
            <img className="object-cover w-fit lg:w-56 h-28 rounded-t" src="https://res.cloudinary.com/djhvhao4u/image/upload/v1682672688/pexels-katerina-holmes-5905709_sb2m3v.jpg" alt=""/>
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
