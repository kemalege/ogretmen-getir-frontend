import { Outlet } from "react-router-dom"
import Dashboard from "./Dashboard"

const Layout = () => {
    return (
        <main className="App">
            <Dashboard/>
            <Outlet />
        </main>
    )
}

export default Layout