import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchAllAppointmentHistory, } from "../services/customerService";

export const useAppointmentHistory = () => {


    const [pastAppointments, setPastAppointments] = useState([]);

    const { id } = useContext(AuthContext);

    const fetchAppointmentHistory = async () => {
        try {
            const data = await fetchAllAppointmentHistory(id);
            setPastAppointments(data.data);

        } catch (error) {
            setError(error.message);
        }
    };

    const [error, setError] = useState(null);

    return { error, fetchAppointmentHistory, pastAppointments, };
}