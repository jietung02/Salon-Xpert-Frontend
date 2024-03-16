export const useGeneralFeedback = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    return { loading, error, successMessage, setSuccessMessage, };
}