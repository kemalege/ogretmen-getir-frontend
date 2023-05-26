import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUserRole } from "./authSlice"

const RequireStudentAuth = () => {
    const token = useSelector(selectCurrentToken)
    const role = useSelector(selectCurrentUserRole)
    const location = useLocation()
    
    return (
        token && role === "student"
            ? <Outlet />
            : <Navigate to="/login" replace />
    )
}
export default RequireStudentAuth