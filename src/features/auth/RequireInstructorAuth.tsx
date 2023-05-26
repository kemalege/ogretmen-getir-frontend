import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUserRole } from "./authSlice"

const RequireInstructorAuth = () => {
    const token = useSelector(selectCurrentToken)
    const role = useSelector(selectCurrentUserRole)
    const location = useLocation()
    
    return (
        token && role === "instructor"
            ? <Outlet />
            : <Navigate to="/login" replace />
    )
}
export default RequireInstructorAuth