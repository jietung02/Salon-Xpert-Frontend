import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { fetchCustomerData, cancelScheduledAppointment } from "../services/customerService";

export const useDashboardCustomer = () => {

    const { id, role, } = useContext(AuthContext);

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [statisticData, setStatisticData] = useState({
        totalAppointmentsCompleted: null,
        topSelectedService: null,
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const fetchDashboardData = async () => {
        try {
            const data = await fetchCustomerData({ id, role });
            setUpcomingAppointments(data.data.upcomingAppointments);
            setStatisticData({
                totalAppointmentsCompleted: data.data.totalAppointmentsCompleted,
                topSelectedService: data.data.topSelectedService,
            })

        } catch (error) {
            setError(error.message);
        }
    }

    const handleCancelAppointment = async (appointmentId) => {
        try {
            setLoading(true);
            const isConfirmed = window.confirm('Are you sure you want to cancel this appointment?');

            if (isConfirmed) {
                await cancelScheduledAppointment(appointmentId);
                setSuccessMessage(`Successfully Cancelled an Appointment : ${appointmentId}`);
            }

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, setError, successMessage, setSuccessMessage, fetchDashboardData, upcomingAppointments, statisticData, handleCancelAppointment, };
}