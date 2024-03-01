import { useState } from 'react';
import { createAppointment, fetchAllServices, fetchMatchSpecialists } from '../services/appointment';

export const useAppontmentBooking = () => {

    const [appointDetails, setAppointDetails] = useState({
        name: null,
        email: null,
        gender: null,
        age: 0,
        contact: null,
        selectedServices: [],
        bookingMethod: null,
        selectedSpecialist: null,
        selectedDateTime: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [services, setServices] = useState([]);
    const [specialists, setSpecialists] = useState([]);

    const updateAppointmentDetails = (e) => {

        if (e.hasOwnProperty('target')) {
            const { name, value, checked, type } = e.target;

            setAppointDetails((prevDetails) => {

                if (type === 'checkbox') {
                    console.log('IN 1')
                    return {
                        ...prevDetails,
                        [name]: checked ? [...prevDetails[name], value] : prevDetails[name].filter(item => item !== value),
                    }
                }
                console.log(name)
                console.log(value)
                return {
                    ...prevDetails,
                    [name]: value,
                }
            });
        }
        else {
            setAppointDetails((prevDetails) => {
                return {
                    ...prevDetails,
                    selectedDateTime: e.valueOf(),
                }
            });
        }


    }


    const resetAppointmentDetails = () => {
        setAppointDetails({
            name: null,
            gender: null,
            age: 0,
            contact: null,
            selectedServices: [],
            bookingMethod: null,
            selectedSpecialist: null,
            selectedDateTime: null,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await createAppointment(appointDetails);
            return;

        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }


    const fetchServices = async () => {
        const allServices = await fetchAllServices();
        setServices(allServices);
    }

    const fetchSpecialists = async () => {
        const specialists = await fetchMatchSpecialists(appointDetails.selectedServices);
        setSpecialists(specialists);
    }

    return { appointDetails, loading, error, services, specialists, updateAppointmentDetails, resetAppointmentDetails, handleSubmit, fetchServices, fetchSpecialists, setSpecialists };

}