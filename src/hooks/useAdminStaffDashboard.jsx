import { useState } from "react";
import { fetchDashboardStatistics } from "../services/Dashboard";

export const useAdminStaffDashboard = () => {

    const [dashboardData, setDashboardData] = useState({
        totalActiveAppointments: null,
        totalCustomers: null,
        totalServices: null,
        allUpcomingAppointments: [],
    });
    const [tableData, setTableData] = useState({
        headers: ['Staff Name', 'Role', 'Bio'],
        staffProfileData: [],
    });

    const [error, setError] = useState(null);


    const fetchDashboardData = async () => {
        try {
            const data = await fetchDashboardStatistics();
            setDashboardData({
                totalActiveAppointments: data.data.totalActiveAppointments,
                totalCustomers: data.data.totalCustomers,
                totalServices: data.data.totalServices,
                allUpcomingAppointments: data.data.allUpcomingAppointments,
            })
            setTableData(prev => {
                return {
                    ...prev,
                    staffProfileData: data.data.staffProfiles,
                }
            });

        } catch (error) {
            setError(error.message);
        }
    }

    return { error, fetchDashboardData, dashboardData, tableData, };
}