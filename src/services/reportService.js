export const fetchSpecialists = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/reports/staff-performance-report/specialists`, {
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

export const generateReport = async (reportDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/reports/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...reportDetails })
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