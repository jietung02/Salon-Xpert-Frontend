import { createContext, useState } from "react";

export const ServiceContext = createContext();


export const ServiceContextProvider = ({ children }) => {

    const [performingChanges, setPerformingChanges] = useState(false);

    const performedChanges = () => {
        setPerformingChanges(!performingChanges);
    }

    const [serviceDetails, setServiceDetails] = useState({
        serviceCode: null,
        serviceName: null,
        serviceDuration: null,
        serviceBasedPrice: null,
    });

    const clearServiceDetails = () => {
        setServiceDetails({
            serviceCode: null,
            serviceName: null,
            serviceDuration: null,
            serviceBasedPrice: null,
        })
    }

    const updateServiceDetails = (e) => {

        if (e.hasOwnProperty('target')) {
            const { name, value } = e.target;

            setServiceDetails({
                ...serviceDetails,
                [name]: value,
            });
        }

    }

    const updateServiceDetailsArrayVer = (service) => {
        setServiceDetails({
            serviceCode: service[0],
            serviceName: service[1],
            serviceDuration: service[2],
            serviceBasedPrice: service[3],
        })
    };

    // const updateServiceDetailsObjectVer = (service) => {
    //     setServiceDetails({
    //         serviceCode: service.serviceCode,
    //         serviceName: service.serviceName,
    //         serviceDuration: service.serviceDuration,
    //         serviceBasedPrice: service.serviceBasedPrice,
    //     })
    // };

    return (
        <ServiceContext.Provider value={{ performingChanges, serviceDetails, performedChanges, updateServiceDetails, updateServiceDetailsArrayVer, clearServiceDetails}}>
            {children}
        </ServiceContext.Provider>
    )
}


