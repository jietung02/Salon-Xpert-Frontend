import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { StaffProfileContext } from "../context/StaffProfileContext";
import { useNavigate } from "react-router-dom";
import { fetchAllProfileRecords, fetchAllRoles, fetchAllServices, createNewStaff, } from "../services/salonConfiguration";

export const useStaffProfileConfiguration = () => {
    const { role } = useContext(AuthContext);
    const { profileDetails, performedChanges, setAllProfiles, setAvailableRoles, setAvailableServices, resetProfileDetails,} = useContext(StaffProfileContext);
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

    const handleEdit = () => {
        // table pass the staff id 
        // and only enable the service provided checkboxes when the selected roles isProvidedServiec (call backend api)
    }

    const handleDelete = () => {

    }

    const handleCreateButton = () => {

    }

    const handleSubmitForStaffCreation = async (e) => {
        e.preventDefault();

        if (profileDetails.servicesProvided.length === 0) {
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

    return { loading, error, tableData, fetchAllProfiles, handleEdit, handleDelete, handleCreateButton, handleSubmitForStaffCreation, fetchRoles, fetchServices, }
}