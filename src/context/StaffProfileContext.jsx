import { createContext, useState } from "react"

export const StaffProfileContext = createContext();

export const StaffProfileContextProvider = ({ children }) => {
    const [performingChanges, setPerformingChanges] = useState(false);

    const performedChanges = () => {
        setPerformingChanges(!performingChanges);
    }

    const [allProfiles, setAllProfiles] = useState([]);

    const [profileDetails, setProfileDetails] = useState({
        staffId: null,
        staffUsername: null,
        staffName: null,
        staffEmail: null,
        roleCode: null,
        servicesProvided: [],
        staffContact: null,
        staffBio: null,
    });

    const updateProfileDetails = (e) => {
        if (e.hasOwnProperty('target')) {
            const { name, value } = e.target;

            setProfileDetails({
                ...profileDetails,
                [name]: value,
            });
        }
    };

    return (
        <StaffProfileContext.Provider value={{ performingChanges, profileDetails, performedChanges, updateProfileDetails, setAllProfiles}} >
            {children}
        </StaffProfileContext.Provider>
    )
}