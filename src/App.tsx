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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<MainPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="user" element={<ProfilePanel />}>
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="edit-photo" element={<EditPhoto />} />
          </Route>
          <Route path="userslist" element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
