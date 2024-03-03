import { useState } from 'react';
import { createAppointment, fetchAllServices, fetchMatchSpecialists, fetchTimeSpecialistTimeSlot, fetchWorkingHoursTimeSlots, fetchSpecialistThatTime } from '../services/appointment';
import dayjs from 'dayjs';
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
        selectedDate: null,
        selectedTime: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [services, setServices] = useState([]);
    const [specialists, setSpecialists] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    const setErrorMessage = (message) => {
        setError(message);
    }
    const updateAppointmentDetails = (e, key, reset) => {
        if (e === null) {
            return;
        }
        if (e.hasOwnProperty('target')) {
            const { name, value, checked, type } = e.target;

            setAppointDetails((prevDetails) => {

                if (type === 'checkbox') {

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

                if (reset) {
                    return {
                        ...prevDetails,
                        selectedDate: null,
                        selectedTime: null,
                    }
                }
                if (key === 'selectedTime') {

                    const combinedDateTime = dayjs(appointDetails.selectedDate).set('hour', e.$H).set('minute', e.$m);

                    const klDateTime = combinedDateTime.tz('Asia/Kuala_Lumpur').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

                    return {
                        ...prevDetails,
                        [key]: klDateTime,
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


    const resetAppointmentDetails = () => {
        setAppointDetails({
            name: null,
            gender: null,
            age: 0,
            contact: null,
            selectedServices: [],
            bookingMethod: null,
            selectedSpecialist: null,
            selectedDate: null,
            selectedTime: null,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (error) {
                return;
            }
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

    const fetchAvailableTimeSlot = async () => {
        try {
            const timeSlots = await fetchTimeSpecialistTimeSlot(appointDetails.selectedServices, appointDetails.selectedSpecialist, appointDetails.selectedDate);
            setAvailableTimeSlots(timeSlots);
        } catch (error) {
            setError(error.message);
        }

    }

    const shouldDisableTime = (value, view) => {
        const hour = value.hour();
        const minute = value.minute();

        if (Array.isArray(availableTimeSlots)) {
            if (view === 'hours') {
                const availableSlots = availableTimeSlots.filter(slot => slot.hour === hour);

                if (availableSlots.some((slot => hour === slot.hour))) {
                    console.log(hour)
                    return false;
                }
                else {
                    console.log(hour)
                    return true;
                }

            }

            if (view === 'minutes') {

                const availableHour = availableTimeSlots.find(slot => slot.hour === hour);

                if (availableHour && availableHour.minutes.includes(minute)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    };

    const fetchWorkingTimeSlots = async () => {
        try {
            const timeSlots = await fetchWorkingHoursTimeSlots();
            setAvailableTimeSlots(timeSlots);
        } catch (error) {
            setError(error.message);
        }
    }

    const fetchSpecialistAvailability = async () => {
        try {
            const specialistsAvailable = await fetchSpecialistThatTime(specialists, appointDetails.selectedServices, appointDetails.selectedTime);
            setSpecialists(specialistsAvailable);
        } catch (error) {
            setSpecialists([]);
            setError(error.message);
        }
    }


    return { appointDetails, loading, error, services, specialists, setAvailableTimeSlots, setErrorMessage, updateAppointmentDetails, resetAppointmentDetails, handleSubmit, fetchServices, fetchSpecialists, setSpecialists, shouldDisableTime, fetchAvailableTimeSlot, fetchWorkingTimeSlots, fetchSpecialistAvailability, };

}