import { useState } from "react";
import { cancelAppointment, payDeposit, } from '../services/customerService';
import { useNavigate } from "react-router-dom";

export const useAppointmentConfirmation = () => {
    const navigate = useNavigate();

    const [summaryDetails, setSummaryDetails] = useState({
        appointmentId: null,
        name: null,
        email: null,
        servicesName: null,
        specialist: null,
        startDateTime: null,
        endDateTime: null,
        estimatedPrice: null,
        depositAmount: null,
        from: null,
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const updateSummaryDetails = (details) => {
        setSummaryDetails({
            appointmentId: details.appointmentId,
            name: details.name,
            email: details.email,
            servicesName: details.servicesName,
            specialist: details.specialist,
            startDateTime: details.startDateTime,
            endDateTime: details.endDateTime,
            estimatedPrice: details.estimatedPrice,
            depositAmount: details.depositAmount,
            from: details.from,
        });
    }

    const handleDepositSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (error) {
                return;
            }

            const path = summaryDetails.from === 'guest' ? '/guest/booking-success' : '/customer/booking-success';
            const from = summaryDetails.from === 'guest' ? 'guest' : 'customer';

            const response = await payDeposit({ ...summaryDetails });

            if (response.status === 'success') {
                navigate(path, { replace: true, state: { bookingDetails: response.data } });
            }

        } catch (err) {

            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleCancel = async () => {
        try {
            setLoading(true);

            const response = await cancelAppointment(summaryDetails.appointmentId);

            if (response.status === 'success') {
                const path = summaryDetails.from === 'guest' ? '/guest/new-appointment' : '/customer/new-appointment';
                navigate(path, { replace: true });
            }


        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, error, handleDepositSubmit, updateSummaryDetails, handleCancel }
}
