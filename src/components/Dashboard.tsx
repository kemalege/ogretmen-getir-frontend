import React from 'react'
import ProfileMenu from './ProfileMenu'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentProfileImage, selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice'
import defAvatar from "../assets/images/defAvatar.svg";
import logo from "../assets/images/logo.svg";

const Dashboard = () => {

  const token = useSelector(selectCurrentToken)
  const currentUser = useSelector(selectCurrentUser)
  const avatar = useSelector(selectCurrentProfileImage)

    let navContent 
    
    if (token) {  
        navContent = ( 
        <>
          <p className="text-gray-200">Welcome {currentUser}!</p>
          <img className="h-10 ml-2 mr-1 lg:ml-8 lg:mr-4 rounded-full" src={avatar || defAvatar} alt="" />
          {/* <button onClick={handleLogOut} onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)} className="text-white text-xl relative"><FontAwesomeIcon icon={faBars} /></button> */}
          {/* {showMenu? <ProfileMenu/>: ""} */}
          <ProfileMenu/>
        </> )
    } else {
        navContent = (
        <>
          <Link to='/login' className="px-4 py-1 mx-2 text-white rounded hover:cursor-pointer hover:bg-gray-300 transition duration-400 transition-500 border-2 border-grey-400">Login</Link>
          <Link to='/register' className="px-4 py-1 text-white rounded hover:cursor-pointer hover:bg-gray-300 transition duration-400 border-2 border-grey-400">Register</Link>
        </>
        )
    }
  return (
    <header className="flex bg-dark-grey h-20 py-4 justify-between px-2 md:pl-12 md:pr-4 lg:pl-36 lg:pr-12">
        <div className="flex">
            <img className="h-full text-white" src={logo} alt="" />
        </div> 
        <div className="flex items-center justify-between">
          {navContent}
        </div>
    </header>
  )
}

export default Dashboard