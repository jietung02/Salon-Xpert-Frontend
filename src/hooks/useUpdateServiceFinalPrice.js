import { useState } from "react";
import { fetchTodayAppointments, updateFinalServicePrice, } from "../services/serviceManagementService";


export const useUpdateServiceFinalPrice = () => {

    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [refresh, setRefresh] = useState(false);


    const refreshPage = () => {
        setRefresh(!refresh);
    }
    const [selectedAppointment, setSelectedAppointment] = useState({
        appointmentId: null,
        serviceFinalPrice: null,
    });

    const [appointments, setAppointments] = useState([]);

    const updateSelectedAppointment = (e) => {
        setError(null);
        if (e.hasOwnProperty('target')) {
            const { name, value, } = e.target;

            setSelectedAppointment((prevDetails) => {
                return {
                    ...prevDetails,
                    [name]: value,
                }
            });
        }
    };

    const resetSelectedAppointment = () => {
        setSelectedAppointment({
            appointmentId: null,
            serviceFinalPrice: null,
        })
    };

    const resetPriceWhenAppointmentIsChanged = () => {
        setSelectedAppointment((prevDetails) => {
            return {
                ...prevDetails,
                serviceFinalPrice: null,
            }
        })
    };

    const fetchCurrentDateAppointments = async () => {
        try {
            setAppointments([]);
            const appointments = await fetchTodayAppointments();

            setAppointments(appointments.data)

        } catch (error) {
            setError(error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const appointment = appointments.find(value => value.appointmentId === selectedAppointment.appointmentId);
            const appointmentType = appointment ? appointment.appointmentType : null;

            const response = await updateFinalServicePrice({ ...selectedAppointment, appointmentType });

            setSuccessMessage(`Successfully Updated Final Service Price for Appointment ID : ${selectedAppointment.appointmentId}`);

            resetSelectedAppointment();
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, setError, successMessage, refresh, refreshPage, setSuccessMessage, fetchCurrentDateAppointments, appointments, selectedAppointment, updateSelectedAppointment, resetSelectedAppointment, resetPriceWhenAppointmentIsChanged, handleSubmit, };
}