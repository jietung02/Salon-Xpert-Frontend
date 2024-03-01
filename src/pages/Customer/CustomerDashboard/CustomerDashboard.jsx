import { Outlet } from "react-router-dom";

export default function CustomerDashboard() {
    return (
        <div>
            <h1>Customer Dashboard</h1>
            <Outlet />
        </div>);
}