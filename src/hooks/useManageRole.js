import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { RoleContext } from "../context/RoleContext";
import { fetchAllRoles, createRole, editRole, deleteRole, } from "../services/userManagement";

export const useManageRole = () => {
    const navigate = useNavigate();
    const { role } = useContext(AuthContext);

    const { setPerformingChanges, performedChanges, roleDetails, updateRoleDetails, updateRoleDetailsArrayVer, clearRoleDetails, } = useContext(RoleContext);


    const [tableData, setTableData] = useState({
        headers: [],
        servicesData: [],
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchRoles = async () => {
        try {
            const allRoles = await fetchAllRoles();
            setTableData({
                headers: allRoles.data.headers,
                rolesData: allRoles.data.rolesData,
            })

        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (details) => {
        clearRoleDetails();

        const reformat = [details[0], details[1], details[2], details[3] === 'Yes' ? '1' : '0'];

        updateRoleDetailsArrayVer(reformat);
        navigate(role === 'admin' ? '/admin/roles/modify' : '/staff/roles/modify');
    };

    const handleDelete = async (roleCode) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this role?');

        if (isConfirmed) {
            //rmb to change the performing state for all delete modify and create, to fetch the services again
            try {
                const response = await deleteRole(roleCode);

                navigate(role === 'admin' ? '/admin/roles' : '/staff/roles', { state: { successMessage: `Successfully Delete Role (Role Code : ${roleCode})` } })
            } catch (error) {
                setError(error.message)
            } finally {
                performedChanges();
            }
        }
    };

    const handleSubmitForRoleCreation = async (e) => {
        e.preventDefault();

        try {
            const response = await createRole(roleDetails);

            navigate(role === 'admin' ? '/admin/roles' : '/staff/roles', { state: { successMessage: `Successfully Created a New Role, Role Code : ${roleDetails.roleCode}` } })
        } catch (error) {
            setError(error.message)
        } finally {
            clearRoleDetails();
            performedChanges();
        }
    };

    const handleSubmitForEditRole = async (e) => {
        e.preventDefault();

        try {
            const response = await editRole(roleDetails);

            navigate(role === 'admin' ? '/admin/roles' : '/staff/roles', { state: { successMessage: `Successfully Updated Role for Role Code : ${roleDetails.roleCode}` } })
        } catch (error) {
            setError(error.message)
        } finally {
            clearRoleDetails();
            performedChanges();
        }
    };

    return { tableData, loading, error, fetchRoles, handleEdit, handleDelete, handleSubmitForRoleCreation, handleSubmitForEditRole, }
}