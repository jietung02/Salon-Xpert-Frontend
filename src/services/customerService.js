export const createAppointment = async (appointDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/appointment/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointDetails)
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

export const fetchAllServices = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/services`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}
export const fetchMatchSpecialists = async (selectedServices) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/match-specialists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedServices)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

export const fetchTimeSpecialistTimeSlot = async (selectedServices, selectedSpecialist, selectedDate) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/specialist-timeslots`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedServices, selectedSpecialist, selectedDate })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

export const fetchWorkingHoursTimeSlots = async (selectedServices, selectedDate) => {
    try {

        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/working-hours`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedServices, selectedDate })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const fetchSpecialistThatTime = async (specialists, selectedServices, selectedTime) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/specialists-available`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ specialists, selectedServices, selectedTime })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const cancelAppointment = async (appointmentId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/appointment/cancel/${appointmentId}`, {
            method: 'PUT',
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

export const cancelScheduledAppointment = async (appointmentId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/appointment-scheduled/cancel/${appointmentId}`, {
            method: 'PUT',
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

export const payDeposit = async (summaryDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/appointment/update/${summaryDetails.appointmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...summaryDetails })
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

export const fetchOwnProfileDetails = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/${id}`, {
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

export const saveProfileDetails = async (id, profileDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...profileDetails })
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

export const fetchAppointmentHistoryForSSFeedback = async (details) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/feedback/service-specific-feedback/${details.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...details })
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

export const submitServiceSpecificFeedback = async (serviceSpecificFeedbackDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/feedback/service-specific-feedback/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...serviceSpecificFeedbackDetails })
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

export const fetchAppointmentDetails = async (appoinmentId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/payment/${appoinmentId}`, {
            method: 'POST',
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

export const makeFinalPayment = async (appoinmentId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/payment/pay/${appoinmentId}`, {
            method: 'PUT',
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

export const fetchCustomerData = async (userData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/dashboard-data/${userData.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...userData })
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

export const fetchAllAppointmentHistory = async (id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/customers/appointment/history/${id}`, {
            method: 'POST',
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


