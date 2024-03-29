

export const loginUser = async (credentials) => {
    try {
        console.log(process.env.REACT_APP_SERVER_URI)
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        return await response.json();
    } catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/customers/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });


        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

    } catch (err) {
        throw new Error(err.message);
    }
}

export const guestLogin = async () => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/users/guest`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });


        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }
        return await response.json()
    } catch (err) {
        throw new Error(err.message);
    }
}
