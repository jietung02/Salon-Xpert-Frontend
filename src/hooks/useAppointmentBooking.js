import { useState } from 'react';
import { createAppointment, fetchAllServices, fetchMatchSpecialists, fetchTimeSpecialistTimeSlot } from '../services/appointment';
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
    const [availableTimeSlot, setAvailableTimeSlot] = useState([]);

    const updateAppointmentDetails = (e, key, reset) => {
        if (e === null) {
            return;
        }
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
        const timeSlots = await fetchTimeSpecialistTimeSlot(appointDetails.selectedServices, appointDetails.selectedSpecialist, appointDetails.selectedDate);
        setAvailableTimeSlot(timeSlots);
    }

    const shouldDisableTime = (value, view) => {
        const schema = [[{ hour: 10, minutes: [0, 30] }, { hour: 12, minutes: [0, 15, 30, 45] }, { hour: 15, minutes: [0, 15] }], { startHour: 10, offHour: 19 }];
        const [unavailableTimeSlots, workingHour] = schema;
        const { startHour, offHour } = workingHour;
        const hour = value.hour();
        const minute = value.minute();


        if (view === 'hours') {
            const unavailableSlot = unavailableTimeSlots.find(slot => slot.minutes.length === 4);

            // Check if there is an unavailable slot with all minutes
            if (unavailableSlot && hour === unavailableSlot.hour) {
                return true;
            }
            return hour < startHour || hour >= offHour;
        }

        if (view === 'minutes') {

            const unavailableHour = unavailableTimeSlots.find(slot => slot.hour === hour);

            if (unavailableHour && unavailableHour.minutes.includes(minute)) {
                return true;
            }
            console.log(unavailableHour)
        }
        return


        // if (view === 'hours') {
        //   return hour < 9 || hour > 13;
        // }
        // if (view === 'minutes') {
        //   const minute = value.minute();
        //   return minute > 20 && hour === 13;
        // }
        // return false;
    };

    return { appointDetails, loading, error, services, specialists, availableTimeSlot, updateAppointmentDetails, resetAppointmentDetails, handleSubmit, fetchServices, fetchSpecialists, setSpecialists, shouldDisableTime, fetchAvailableTimeSlot };

}