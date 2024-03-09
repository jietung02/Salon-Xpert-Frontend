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

  const updateProfileDetails = (e) => {
    console.log(e.target)
    if (e.hasOwnProperty('target')) {
      const { name, value, type, checked } = e.target;

      setProfileDetails((prevDetails) => {
        if (type === 'checkbox') {
          return {
            ...prevDetails,
            [name]: checked ? [...prevDetails[name], value] : prevDetails[name].filter(item => item !== value),

          };
        }

        return {
          ...prevDetails,
          [name]: value,
        };
      });
    }
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

  return (
    <StaffProfileContext.Provider value={{ performingChanges, allProfiles, profileDetails, availableRoles, availableServices, performedChanges, updateProfileDetails, setAllProfiles, setAvailableRoles, setAvailableServices, clearServiceProvided, resetProfileDetails,}} >
      {children}
    </StaffProfileContext.Provider>
  )
};