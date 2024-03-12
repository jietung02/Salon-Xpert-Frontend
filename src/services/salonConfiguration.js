export const getSalonServices = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/services`, {
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

export const createNewService = async (serviceDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/services/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...serviceDetails })
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

export const editService = async (serviceDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/services/${serviceDetails.serviceCode}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...serviceDetails })
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

export const deleteService = async (serviceCode) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/services/${serviceCode}`, {
            method: 'DELETE',
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

export const fetchAllProfileRecords = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/staff-profiles`, {
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

export const fetchAllRoles = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/staff-profiles/roles`, {
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

export const fetchAllServices = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/staff-profiles/services`, {
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

export const createNewStaff = async (profileDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/staff-profiles/new`, {
            method: 'POST',
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

export const editStaffProfile = async (profileDetails) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/staff-profiles/${profileDetails.staffId}`, {
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

export const deleteProfile = async (staffId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/staff-profiles/${staffId}`, {
            method: 'DELETE',
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

export const fetchAllPriceOptions = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/pricing-options`, {
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

export const savePriceOptions = async (priceOptions) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/pricing-options/save`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ priceOptions })
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

export const fetchAllPricingRules = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/pricing-rules`, {
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

export const fetchAllSalonServices = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/pricing-rules/services`, {
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

export const fetchAllAgeCategories = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/pricing-rules/age-categories`, {
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

export const fetchMatchSpecialists = async (serviceCode) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/salon-configurations/pricing-rules/match-specialists/${serviceCode}`, {
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