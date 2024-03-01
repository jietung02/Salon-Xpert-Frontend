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

    const bookAppointment = async () => {
        const response = await createAppointment(appointDetails);

    }

    const fetchServices = async () => {
        const allServices = await fetchAllServices();
        setServices(allServices);
    }

    const fetchSpecialists = async () => {
        const specialists = await fetchMatchSpecialists(appointDetails.selectedServices);
        setSpecialists(specialists);
    }

    return { appointDetails, services, specialists, updateAppointmentDetails, resetAppointmentDetails, bookAppointment, fetchServices, fetchSpecialists, setSpecialists };

}