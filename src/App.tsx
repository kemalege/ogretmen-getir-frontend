import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import UsersList from "./features/users/UsersList";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";
import ProfilePanel from "./components/ProfilePanel";
import EditPhoto from "./components/EditPhoto";
import CourseList from "./components/CourseList";
import CourseDetails from "./components/CourseDetails";
import Checkout from "./components/Checkout";
import CreateCourse from "./components/CreateCourse";
import RequireStudentAuth from "./features/auth/RequireStudentAuth";
import RequireInstructorAuth from "./features/auth/RequireInstructorAuth";
import InstructorList from "./components/InstructorList";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<MainPage />} />    
        <Route path="courses" element={<CourseList />} />    
        <Route path="instructors" element={<InstructorList />} />    
        <Route path="course-details/:id" element={<CourseDetails />} />    
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="cart" element={<Welcome />} />
          
          <Route path="user" element={<ProfilePanel />}>
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="edit-photo" element={<EditPhoto />} />
          </Route>
          <Route path="userslist" element={<UsersList />} />
        </Route>
        <Route element={<RequireStudentAuth />}>
          <Route path="cart/checkout" element={<Checkout />} />
          <Route path="cart/checkout/express/course/:id" element={<Checkout />} />  
        </Route>
        <Route element={<RequireInstructorAuth />}>
          <Route path="create-course" element={<CreateCourse />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
