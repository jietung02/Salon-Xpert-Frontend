import { useContext, useState } from "react";
import { fetchAppointmentHistoryForSSFeedback, submitServiceSpecificFeedback, } from "../services/customerService";
import { AuthContext } from "../context/AuthContext";

export const useServiceSpecificFeedback = () => {

    const { id, role } = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [serviceSpecificFeedbackDetails, setServiceSpecificFeedbackDetails] = useState({
        appointmentId: null,
        overallServiceRating: null,
        cleaninessRating: null,
        serviceSatisfactionRating: null,
        communicationRating: null,
        feedbackCategory: null,
        feedbackComments: null,
    });

    const refreshPage = () => {
        setRefresh(!refresh);
    }

    const overallServiceRatingScale = [
        { id: 'osrs1', value: '1', label: '1' },
        { id: 'osrs2', value: '2', label: '2' },
        { id: 'osrs3', value: '3', label: '3' },
        { id: 'osrs4', value: '4', label: '4' },
        { id: 'osrs5', value: '5', label: '5' },
    ];

    const cleaninessRatingScale = [
        { id: 'crs1', value: '1', label: '1' },
        { id: 'crs2', value: '2', label: '2' },
        { id: 'crs3', value: '3', label: '3' },
        { id: 'crs4', value: '4', label: '4' },
        { id: 'crs5', value: '5', label: '5' },
    ];

    const serviceSatisfactionRatingScale = [
        { id: 'ssrs1', value: '1', label: '1' },
        { id: 'ssrs2', value: '2', label: '2' },
        { id: 'ssrs3', value: '3', label: '3' },
        { id: 'ssrs4', value: '4', label: '4' },
        { id: 'ssrs5', value: '5', label: '5' },
    ];

    const communicationRatingScale = [
        { id: 'comsrs1', value: '1', label: '1' },
        { id: 'comsrs2', value: '2', label: '2' },
        { id: 'comsrs3', value: '3', label: '3' },
        { id: 'comsrs4', value: '4', label: '4' },
        { id: 'comsrs5', value: '5', label: '5' },
    ];

    const category = [
        { id: 'praise', value: 'praise', label: 'Praise and Positive Feedback' },
        { id: 'improvement', value: 'improvement', label: 'Suggestions for Improvement' },
        { id: 'complaint', value: 'complaint', label: 'Complaints and Concerns' },
    ];

    const [appointmentHistory, setAppointmentHistory] = useState([]);


    const updateServiceSpecificFeedbackDetails = (e) => {
        setError(null);
        if (e.hasOwnProperty('target')) {
            const { name, value, type, checked } = e.target;

            setServiceSpecificFeedbackDetails((prevDetails) => {
                if (type === 'checkbox') {
                    return {
                        ...prevDetails,
                        [name]: checked ? [...prevDetails[name], value] : prevDetails[name].filter(item => item !== value),

                    };
                }

                return {
                    ...prevDetails,
                    [name]: value,
                };
            })
        }
    }

    const resetRatingsDetailsWhenAppointmentIDChanged = () => {
        setServiceSpecificFeedbackDetails({
            ...serviceSpecificFeedbackDetails,
            overallServiceRating: null,
            cleaninessRating: null,
            serviceSatisfactionRating: null,
            communicationRating: null,
            feedbackCategory: null,
            feedbackComments: null,
        })
    };

    const resetSpecificFeedbackDetails = () => {
        setServiceSpecificFeedbackDetails({
            appointmentId: null,
            overallServiceRating: null,
            cleaninessRating: null,
            serviceSatisfactionRating: null,
            communicationRating: null,
            feedbackCategory: null,
            feedbackComments: null,
        })
    };




    const fetchAppointmentHistoryForFeedback = async () => {
        try {
            setAppointmentHistory([]);
            const history = await fetchAppointmentHistoryForSSFeedback({ id, role });

            setAppointmentHistory(history.data);


        } catch (error) {
            setError(error.message);
        }
    }

    const handleSubmitForServiceSpecificFeedback = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await submitServiceSpecificFeedback({ ...serviceSpecificFeedbackDetails });

            resetSpecificFeedbackDetails();
            setSuccessMessage(`Successfully Submitted Feedback`);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }

    };

    return { loading, error, setError, successMessage, setSuccessMessage, refresh, refreshPage, serviceSpecificFeedbackDetails, appointmentHistory, updateServiceSpecificFeedbackDetails, resetRatingsDetailsWhenAppointmentIDChanged, fetchAppointmentHistoryForFeedback, handleSubmitForServiceSpecificFeedback, overallServiceRatingScale, cleaninessRatingScale, serviceSatisfactionRatingScale, communicationRatingScale, category, };
};