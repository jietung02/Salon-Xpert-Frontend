import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { StaffProfileContext } from "../context/StaffProfileContext";
import { useNavigate } from "react-router-dom";
import { fetchAllProfileRecords, fetchAllRoles, fetchAllServices, createNewStaff, editStaffProfile, deleteProfile, } from "../services/salonConfiguration";

export const useStaffProfileConfiguration = () => {
    const { role } = useContext(AuthContext);
    const { profileDetails, allProfiles, performedChanges, setAllProfiles, updateProfileDetailsObj, setAvailableRoles, setAvailableServices, resetProfileDetails, checkRoleIsServiceProvider, checkRoleIsServiceProviderWithArgs, } = useContext(StaffProfileContext);
    const navigate = useNavigate();

    const [tableData, setTableData] = useState({
        headers: [],
        staffProfilesData: [],
    });


    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAllProfiles = async () => {
        try {
            const allProfiles = await fetchAllProfileRecords();
            setTableData({
                headers: allProfiles.data.headers,
                staffProfilesData: allProfiles.data.staffProfilesData,
            })
            setAllProfiles(allProfiles.data.additionalData)

        } catch (error) {
            // if (error.message === 'No Services Found') {
            setError(error.message);
            // }
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

    const handleCreateButton = () => {

    }

    const handleSubmitForStaffCreation = async (e) => {
        e.preventDefault();

        if (checkRoleIsServiceProvider && profileDetails.servicesProvided.length === 0) {
            setError('Please Select at Least One Service');
            return;
        }

        try {
            const response = await createNewStaff(profileDetails);

            navigate(role === 'admin' ? '/admin/staff-profile-configurations' : '/staff-profile-configurations', { state: { successMessage: `Successfully Created a Staff Profile, Staff Username : ${profileDetails.staffUsername}` } })
        } catch (error) {
            setError(error.message)
        } finally {
            resetProfileDetails();
            performedChanges();
        }
    }

    const handleSubmitForEditStaff = async (e) => {
        e.preventDefault();

        if (checkRoleIsServiceProvider() && profileDetails.servicesProvided.length === 0) {
            setError('Please Select at Least One Service');
            return;
        }

        try {
            const response = await editStaffProfile(profileDetails);

            navigate(role === 'admin' ? '/admin/staff-profile-configurations' : '/staff-profile-configurations', { state: { successMessage: `Successfully Edited the Staff Profile, Staff Username : ${profileDetails.staffUsername}` } })
        } catch (error) {
            setError(error.message)
        } finally {
            resetProfileDetails();
            performedChanges();
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

    return { loading, error, tableData, fetchAllProfiles, handleEdit, handleDelete, handleCreateButton, handleSubmitForStaffCreation, handleSubmitForEditStaff, fetchRoles, fetchServices, }
}