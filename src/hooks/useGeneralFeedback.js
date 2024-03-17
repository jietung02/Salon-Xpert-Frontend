import { useContext, useState } from "react";
import { submitGeneralFeedback } from "../services/feedback";
import { AuthContext } from "../context/AuthContext";


export const useGeneralFeedback = () => {

    const { gender, age } = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [generalFeedbackDetails, setGeneralFeedbackDetails] = useState({
        gender: null,
        age: null,
        feedbackCategory: null,
        feedbackComments: null,
        isAnonymous: 'no',
        name: null,
        email: null,
    });


    const category = [
        { id: 'praise', value: 'praise', label: 'Praise and Positive Feedback' },
        { id: 'improvement', value: 'improvement', label: 'Suggestions for Improvement' },
        { id: 'complaint', value: 'complaint', label: 'Complaints and Concerns' },
    ];

    const updateGeneralFeedbackDetails = (e) => {
        setError(null);
        if (e.hasOwnProperty('target')) {
            const { name, value, type, checked } = e.target;

            setGeneralFeedbackDetails((prevDetails) => {
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
    };

    const resetGeneralFeedbackDetails = () => {
        setGeneralFeedbackDetails({
            gender: gender && gender !== null ? gender : null,
            age: age && age !== null ? age : null,
            feedbackCategory: null,
            feedbackComments: null,
            isAnonymous: 'no',
            name: null,
            email: null,
        })
    }

    const resetNameAndEmail = () => {
        setGeneralFeedbackDetails({
            ...generalFeedbackDetails,
            name: null,
            email: null,
        })
    };


    const handleSubmitForGeneralFeedback = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await submitGeneralFeedback(generalFeedbackDetails);

            resetGeneralFeedbackDetails();
            setSuccessMessage(`Successfully Submitted Feedback`);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }


    return { loading, error, successMessage, setSuccessMessage, category, generalFeedbackDetails, setGeneralFeedbackDetails, resetGeneralFeedbackDetails, updateGeneralFeedbackDetails, resetNameAndEmail, handleSubmitForGeneralFeedback, };
}