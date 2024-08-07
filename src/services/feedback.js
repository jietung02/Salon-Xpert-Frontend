export const fetchAllFeedbackAndRatings = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/feedback-management`, {
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