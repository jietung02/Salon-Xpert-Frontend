export const fetchAppointmentHistoryForSSFeedback = async (customerId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/feedback/service-specific-feedback/${customerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

export const submitServiceSpecificFeedback = async (serviceSpecificFeedbackDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/feedback/service-specific-feedback/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...serviceSpecificFeedbackDetails })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

export const submitGeneralFeedback = async (generalFeedbackDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/feedback/general-feedback/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...generalFeedbackDetails })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }

}