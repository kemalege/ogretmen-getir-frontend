import { faArrowRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut, setCredentials } from "../features/auth/authSlice";
import { useGetToProfileQuery, useLogOutMutation } from "../features/auth/authApiSlice";

const ProfileMenu = () => {

  const dispatch = useDispatch()
  const [logout] = useLogOutMutation();
  const navigate = useNavigate()

  const {data, error, refetch} = useGetToProfileQuery()

  const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {  
    e.preventDefault()
    try {
      const payload = await logout({}).unwrap()
      alert(payload?.message)
      dispatch(logOut())
    } catch (err: any) {
      if(err?.status === 401){
        alert(err?.data?.message)
      }        
    }
  }
  // const handleProfileRedirect = async (e: React.MouseEvent<HTMLButtonElement>) => {  
  //   try {
  //     await refetch().unwrap()
  //     navigate('/user/edit-profile')
  //   } catch (err:any) {
  //     if(err?.status === 401){      
  //       alert(err?.data?.message)
  //     }
  //   }
  // }

  return (
    <div className="group relative">
      <button className="border-none p-2 my-5 text-white text-xl"><FontAwesomeIcon icon={faBars} /></button>
      <div className="hidden absolute flex-col  text-gray-600 bg-white group-hover:flex hover:flex-col right-0 w-32 shadow-lg z-10 ">
        <div className="border-b px-4 py-2">
          <Link to='/profile' className="hover:text-getir-green">My Courses</Link>
        </div>
        <div className="px-4 py-2">
          <button className="hover:text-getir-green">Options</button>
        </div>
        <div className="border-b px-4 py-2">
          {/* <button onClick={handleProfileRedirect} className="hover hover:text-getir-green">Profile</button> */}
          <Link to="/user/edit-profile" className="hover hover:text-getir-green">Profile</Link>
        </div>
        <div >
          <button onClick={handleLogOut} className="px-4 py-2 hover hover:text-getir-green">Log Out<FontAwesomeIcon className="ml-4"icon={faArrowRightFromBracket} /></button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
