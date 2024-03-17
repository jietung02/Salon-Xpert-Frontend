import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchOwnProfileDetails, saveProfileDetails, } from "../services/customerService";
import dayjs from "dayjs";

export const useProfile = () => {

    const { customerId, dispatch } = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [profileDetails, setProfileDetails] = useState({
        username: null,
        password: null,
        name: null,
        email: null,
        contact: null,
        gender: null,
        birthdate: null,
    });



    const updateProfileDetails = (e, key, reset) => {
        setError(null);
        if (e === null) {
            return;
        }
        if (e.hasOwnProperty('target')) {
            const { name, value, checked, type } = e.target;

            setProfileDetails((prevDetails) => {

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
            });
        }
        else {
            setProfileDetails((prevDetails) => {

                if (key === 'selectedDate' && reset) {
                    return {
                        ...prevDetails,
                        selectedDate: null,
                    }
                }
                else {

                    return {
                        ...prevDetails,

                        [key]: e.tz('Asia/Kuala_Lumpur').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                    }
                }

            });
        }
    }


    const fetchProfileDetails = async () => {
        try {
            const details = await fetchOwnProfileDetails(customerId);

            const reformat = {
                ...details.data,
                birthdate: dayjs(details.data.birthdate).tz('Asia/Kuala_Lumpur').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
            }
            setProfileDetails(reformat);

        } catch (error) {
            setError(error.message);
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();

        try {

            if (error !== null) {
                return;
            }

            setLoading(true);
            const response = await saveProfileDetails(customerId, profileDetails);
            updateAuthContextData();
            //rmb if success update context also
            setSuccessMessage('Successfully Updated Profile Details');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const updateAuthContextData = () => {
        const currentDate = dayjs();
        const birthdate = profileDetails.birthdate;
        const age = currentDate.diff(birthdate, 'year');

        dispatch({ type: 'EDITPROFILE', payload: { name: profileDetails.name, email: profileDetails.email, contact: profileDetails.contact, age } });
    }

    return { loading, error, setError, successMessage, setSuccessMessage, profileDetails, setProfileDetails, updateProfileDetails, fetchProfileDetails, handleSave, };
}