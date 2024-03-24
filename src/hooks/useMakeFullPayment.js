import { useState } from "react";
import { fetchAppointmentDetails, makeFinalPayment, } from "../services/customerService";
import dayjs from "dayjs";

export const useMakeFullPayment = () => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [appointmentDetails, setAppointmentDetails] = useState({
        appointmentId: null,
        services: null,
        name: null,
        staffName: null,
        finalPrice: null,
        appointmentDateTime: null,
        depositPaid: null,
        remainingAmount: null,
    });

    const updateAppointmentDetails = (details) => {
        setAppointmentDetails({
            appointmentId: details.appointmentId,
            services: details.services,
            name: details.name,
            staffName: details.staffName,
            finalPrice: details.finalPrice,
            appointmentDateTime: details.appointmentDateTime,
            depositPaid: details.depositPaid,
            remainingAmount: details.remainingAmount,
        })
    };

    const fetchAppointment = async (appointmentId) => {
        try {
            const details = await fetchAppointmentDetails(appointmentId);

            const reformatObject = {
                ...details.data,
                appointmentDateTime: dayjs(details.data.appointmentDateTime).tz('Asia/Kuala_Lumpur').format('DD-MM-YYYY HH:mm'),
            };

            console.log(reformatObject)
            updateAppointmentDetails(reformatObject);

        } catch (error) {
            setError(error.message);
        }
    };

    const handlePayNow = async (e) => {
        e.preventDefault();

        try {

            if (error) {
                return;
            }

            setLoading(true);
            const response = await makeFinalPayment(appointmentDetails.appointmentId);

            setSuccess(true);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, setSuccess, appointmentDetails, updateAppointmentDetails, fetchAppointment, handlePayNow, };
};