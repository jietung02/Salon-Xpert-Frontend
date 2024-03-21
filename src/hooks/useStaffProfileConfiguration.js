import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { StaffProfileContext } from "../context/StaffProfileContext";
import { useNavigate } from "react-router-dom";
import { fetchAllProfileRecords, fetchAllRoles, fetchAllServices, createNewStaff, editStaffProfile, deleteProfile, } from "../services/salonConfiguration";

export const useStaffProfileConfiguration = () => {
    const { role } = useContext(AuthContext);
    const { profileDetails, allProfiles, performedChanges, setAllProfiles, setProfileDetails, updateProfileDetailsObj, setAvailableRoles, setAvailableServices, resetProfileDetails, checkRoleIsServiceProvider, checkRoleIsServiceProviderWithArgs, } = useContext(StaffProfileContext);
    const navigate = useNavigate();

    const [tableData, setTableData] = useState({
        headers: [],
        staffProfilesData: [],
    });


    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateProfileDetails = (e) => {
        setError(null);
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

    const fetchAllProfiles = async () => {
        try {
            const allProfiles = await fetchAllProfileRecords();
            setTableData({
                headers: allProfiles.data.headers,
                staffProfilesData: allProfiles.data.staffProfilesData,
            })
            setAllProfiles(allProfiles.data.additionalData)

        } catch (error) {
            setError(error.message);
        }

    }

    const handleEdit = (profileDetails) => {
        
        resetProfileDetails();
        const profile = allProfiles.find(value => value.staffId === profileDetails[0]);

        const isServiceProvider = checkRoleIsServiceProviderWithArgs(profile.staffRoleCode);

        const reformat = {
            ...profile,
            serviceCodes: isServiceProvider ? profile.serviceCodes.split(', ') : [],
        }

        updateProfileDetailsObj(reformat);
        navigate(role === 'admin' ? '/admin/staff-profile-configurations/modify' : '/staff/staff-profile-configurations/modify');
    }

    const handleDelete = async (staffId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this staff profile?');

        if (isConfirmed) {
            //rmb to change the performing state for all delete modify and create, to fetch the services again
            try {
                const response = await deleteProfile(staffId);

                navigate(role === 'admin' ? '/admin/staff-profile-configurations' : '/staff/staff-profile-configurations', { state: { successMessage: `Successfully Delete Service (Service Code : ${staffId})` } })
            } catch (error) {
                setError(error.message)
            } finally {
                performedChanges();
            }
        }
        //rmb to delete from user table also since the constraint is not working
    }

    const handleSubmitForStaffCreation = async (e) => {
        e.preventDefault();

        if (checkRoleIsServiceProvider() && profileDetails.servicesProvided.length === 0) {
            setError('Please Select at Least One Service');
            return;
        }

        try {
            setLoading(true);
            const response = await createNewStaff(profileDetails);
            resetProfileDetails();

            navigate(role === 'admin' ? '/admin/staff-profile-configurations' : '/staff-profile-configurations', { state: { successMessage: `Successfully Created a Staff Profile, Staff Username : ${profileDetails.staffUsername}` } });
            performedChanges();
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    const handleSubmitForEditStaff = async (e) => {
        e.preventDefault();

        if (checkRoleIsServiceProvider() && profileDetails.servicesProvided.length === 0) {
            setError('Please Select at Least One Service');
            return;
        }

        try {
            setLoading(true);
            const response = await editStaffProfile(profileDetails);
            resetProfileDetails();

            navigate(role === 'admin' ? '/admin/staff-profile-configurations' : '/staff-profile-configurations', { state: { successMessage: `Successfully Edited the Staff Profile, Staff Username : ${profileDetails.staffUsername}` } });
            performedChanges();
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    const fetchRoles = async () => {
        try {
            const allRoles = await fetchAllRoles();

            setAvailableRoles(allRoles.data);

        } catch (error) {
            setError(error.message);
        }
    }

    const fetchServices = async () => {
        try {
            const allServices = await fetchAllServices();

            setAvailableServices(allServices.data);

        } catch (error) {
            setError(error.message);
        }
    }

    return { loading, error, tableData, fetchAllProfiles, updateProfileDetails, handleEdit, handleDelete, handleSubmitForStaffCreation, handleSubmitForEditStaff, fetchRoles, fetchServices, }
}