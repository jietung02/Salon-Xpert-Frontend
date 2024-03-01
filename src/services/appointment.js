export const createAppointment = async (appointDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/appointment/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointDetails)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }

}

export const fetchAllServices = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/services`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}
export const fetchMatchSpecialists = async (selectedServices) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/match-specialists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedServices)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

