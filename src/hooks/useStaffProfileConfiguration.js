import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { StaffProfileContext } from "../context/StaffProfileContext";
import { useNavigate } from "react-router-dom";
import { fetchAllProfileRecords } from "../services/salonConfiguration";

export const useStaffProfileConfiguration = () => {
    const { role } = useContext(AuthContext);
    const { profileDetails, performedChanges, setAllProfiles } = useContext(StaffProfileContext);
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
        try {
            // const response = await createNewStaff(serviceDetails);

            navigate(role === 'admin' ? '/admin/staff-profile-configurations' : '/staff-profile-configurations', { state: { successMessage: `Successfully Created a Staff Profile, StaffID : ${profileDetails.staffId}` } })
        } catch (error) {
            setError(error.message)
        } finally {
            performedChanges();
        }
    }

    return { loading, error, tableData, fetchAllProfiles, handleEdit, handleDelete, handleCreateButton, handleSubmitForStaffCreation, }
}