import { createContext, useState } from "react";

export const ServiceContext = createContext();

// export const updatePerformingChanges = () => {
//     setPerformingChanges(!performingChanges);
// }

export const ServiceContextProvider = ({ children }) => {

    const [performingChanges, setPerformingChanges] = useState(false);

    const performedChanges = () => {
        setPerformingChanges(!performingChanges);
    }

    return (
        <ServiceContext.Provider value={{performingChanges, performedChanges}}>
            {children}
        </ServiceContext.Provider>
    )
}


