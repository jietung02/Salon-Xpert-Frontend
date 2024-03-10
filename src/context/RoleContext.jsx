import { createContext, useState } from "react";


export const RoleContext = createContext();

export const RoleContextProvider = ({ children }) => {

    const [performingChanges, setPerformingChanges] = useState(false);

    const performedChanges = () => {
        setPerformingChanges(!performingChanges);
    }
    const [roleDetails, setRoleDetails] = useState({
        roleCode: null,
        roleName: null,
        roleDescription: null,
        roleIsServiceProvider: null,
    })


    const updateRoleDetails = (e) => {
        if (e.hasOwnProperty('target')) {
            const { name, value } = e.target;

            setRoleDetails({
                ...roleDetails,
                [name]: value,
            });
        }
    }

    const updateRoleDetailsArrayVer = (details) => {
        setRoleDetails({
            roleCode: details[0],
            roleName: details[1],
            roleDescription: details[2],
            roleIsServiceProvider: details[3],
        })
    }

    const clearRoleDetails = () => {
        setRoleDetails({
            roleCode: null,
            roleName: null,
            roleDescription: null,
            roleIsServiceProvider: null,
        })
    }

    return (
        <RoleContext.Provider value={{ performingChanges, roleDetails, performedChanges, updateRoleDetails, clearRoleDetails, updateRoleDetailsArrayVer,}} >
            {children}
        </RoleContext.Provider>
    )
}