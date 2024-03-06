export const getSalonServices = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/services`, {
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

export const createNewService = async (serviceDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/services/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...serviceDetails })
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