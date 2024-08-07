export const fetchStaffCalendarId = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/service-management/schedule/${id}`, {
            method: 'POST',
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
};

export const fetchTodayAppointments = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/service-management/update-service-price/appointments`, {
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
};

export const updateFinalServicePrice = async (selectedAppointment) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/service-management/update-service-price/${selectedAppointment.appointmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...selectedAppointment })
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