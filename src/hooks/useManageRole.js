import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { RoleContext } from "../context/RoleContext";
import { fetchAllRoles, createRole, editRole, deleteRole, fetchAllPermissionCategories, } from "../services/userManagement";

export const useManageRole = () => {
    const navigate = useNavigate();
    const { role } = useContext(AuthContext);

    const { performedChanges, setRoleDetails, roleDetails, updateRoleDetailsArrayVer, clearRoleDetails, } = useContext(RoleContext);


    const [tableData, setTableData] = useState({
        headers: [],
        servicesData: [],
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateRoleDetails = (e) => {
        setError(null);
        if (e.hasOwnProperty('target')) {
            const { name, value } = e.target;

            setRoleDetails({
                ...roleDetails,
                [name]: value,
            });
        }
    }

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

    const fetchPermissionCategories = async () => {
        try {
            const allCategories = await fetchAllPermissionCategories();
            setTableData({
                headers: allCategories.data.headers,
                permissionCategories: allCategories.data.permissionCategoriesData,
            })

        } catch (error) {
            setError(error.message);
        }
    }

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
            setLoading(true);
            const response = await createRole(roleDetails);
            clearRoleDetails();
            navigate(role === 'admin' ? '/admin/roles' : '/staff/roles', { state: { successMessage: `Successfully Created a New Role, Role Code : ${roleDetails.roleCode}` } })
            performedChanges();
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitForEditRole = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await editRole(roleDetails);
            clearRoleDetails();
            navigate(role === 'admin' ? '/admin/roles' : '/staff/roles', { state: { successMessage: `Successfully Updated Role for Role Code : ${roleDetails.roleCode}` } })
            performedChanges();
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };

    return { tableData, loading, error, updateRoleDetails, fetchRoles, fetchPermissionCategories, handleEdit, handleDelete, handleSubmitForRoleCreation, handleSubmitForEditRole, }
}