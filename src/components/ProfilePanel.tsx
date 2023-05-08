import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentProfileImage, selectCurrentUser } from "../features/auth/authSlice";
import defAvatar from "../assets/images/defAvatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ProfilePanel = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [url, setUrl] = useState("");

  const currentUser = useSelector(selectCurrentUser)
  const avatar = useSelector(selectCurrentProfileImage)

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <div className="flex flex-col md:flex-row lg:flex-row">
      <div className="flex-col bg-gray-100 md:min-h-screen md:min-w-[14rem] lg:min-w-[14rem]"> 
      <Link to={from} className="flex m-4 hover:text-getir-green"><FontAwesomeIcon icon={faChevronLeft}/></Link>
        <div className="flex items-center flex-col my-4">
            <img className="h-20 rounded-full" src={avatar || defAvatar} alt="" />
            <p className="text-center">{currentUser}</p>
        </div>
        <ul className="flex flex-row md:flex-col lg:flex-col py-4">
          <li className="hover:bg-gray-200 cursor-pointer focus:bg-gray-300">
            <NavLink
              to="/user/edit-profile"
              className={({isActive})=>isActive? "hover:text-white px-4 py-2 flex bg-getir-green text-white" :"hover:text-black px-4 py-2 flex"}
            >
              Profile
            </NavLink>
          </li>
          <li className="hover:bg-gray-200 cursor-pointer focus:bg-gray-300">
          <NavLink
              to="/user/edit-photo"
              className={({isActive})=>isActive? "hover:text-white px-4 py-2 flex bg-getir-green text-white" :"hover:text-black px-4 py-2 flex"}
            >
              Photo
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet/>
      <div className="">
      </div>
    </div>
  );
};

export default ProfilePanel;
