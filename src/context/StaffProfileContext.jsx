import { createContext, useState } from "react"

export const StaffProfileContext = createContext();

export const StaffProfileContextProvider = ({ children }) => {
  const [performingChanges, setPerformingChanges] = useState(false);


  const performedChanges = () => {
    setPerformingChanges(!performingChanges);
  }

  const [allProfiles, setAllProfiles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [profileDetails, setProfileDetails] = useState({
    staffId: null,
    staffUsername: null,
    staffPassword: null,
    staffName: null,
    staffEmail: null,
    staffRole: null,
    servicesProvided: [],
    staffContact: null,
    staffBio: null,
  });


  const updateProfileDetailsObj = (details) => {
    setProfileDetails({
      staffId: details.staffId,
      staffUsername: details.staffUsername,
      staffPassword: details.staffPassword,
      staffName: details.staffName,
      staffEmail: details.staffEmail,
      staffRole: details.staffRoleCode,
      servicesProvided: details.serviceCodes,
      staffContact: details.staffContact,
      staffBio: details.staffBio,
    })
  }

  const resetProfileDetails = () => {
    setProfileDetails({
      staffId: null,
      staffUsername: null,
      staffPassword: null,
      staffName: null,
      staffEmail: null,
      staffRole: null,
      servicesProvided: [],
      staffContact: null,
      staffBio: null,
    })
  }

  const clearServiceProvided = () => {
    setProfileDetails((prevDetails) => {
      return {
        ...prevDetails,
        servicesProvided: [],
      }
    });
  };

  const checkRoleIsServiceProvider = () => {
    const selectedRole = availableRoles.find(role => role.roleCode === profileDetails.staffRole);

    if (selectedRole && selectedRole.roleIsServiceProvider === 1) {
      return true;
    }
    else {
      return false;
    }
  }

  const checkRoleIsServiceProviderWithArgs = (serviceCode) => {

    const selectedRole = availableRoles.find(role => role.roleCode === serviceCode);

    if (selectedRole && selectedRole.roleIsServiceProvider === 1) {
      return true;
    }
    else {
      return false;
    }
  }


  return (
    <StaffProfileContext.Provider value={{ performingChanges, allProfiles, profileDetails, availableRoles, availableServices, performedChanges, setProfileDetails, setAllProfiles, setAvailableRoles, setAvailableServices, clearServiceProvided, updateProfileDetailsObj, resetProfileDetails, checkRoleIsServiceProvider, checkRoleIsServiceProviderWithArgs, }} >
      {children}
    </StaffProfileContext.Provider>
  )
};