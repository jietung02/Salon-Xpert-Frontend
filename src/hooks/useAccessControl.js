import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchAllRolesObj, fetchAllPermissionCategories, fetchAllRolePermissions, saveRoleAccess, } from "../services/userManagement";
import { useNavigate } from "react-router-dom";

export const useAccessControl = () => {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  const [rolePermissions, setRolePermissions] = useState({
    roleCode: null,
    permissions: [],
  });

  const [roles, setRoles] = useState([]);
  const [permissionCategories, setPermissionCategories] = useState([]);

  const [performingChanges, setPerformingChanges] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateRolePermissions = (e) => {
    setError(null);
    if (e.hasOwnProperty('target')) {
      const { name, value, type, checked } = e.target;
      console.log(name, value)
      setRolePermissions((prevDetails) => {
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

  const resetRolePermissions = () => {
    setRolePermissions({
      roleCode: null,
      permissions: [],
    });
  };

  const fetchRoles = async () => {
    try {
      const allRoles = await fetchAllRolesObj();
      setRoles(allRoles.data);

    } catch (error) {
      setError(error.message);
    }
  }

  const fetchPermissions = async () => {
    try {
      const categories = await fetchAllPermissionCategories();
      setPermissionCategories(categories.data);

    } catch (error) {
      setError(error.message);
    }
  }

  const fetchRolePermissions = async () => {
    try {
      const category = await fetchAllRolePermissions(rolePermissions.roleCode);

      setRolePermissions({
        roleCode: category.data.roleCode,
        permissions: category.data.permissionCategories,
      });

    } catch (error) {
      setError(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (rolePermissions.permissions.length === 0) {
        throw new Error('No Permissions Selected');
      }
      if (rolePermissions.roleCode === null || rolePermissions.roleCode === '') {
        throw new Error('No Role Selected');
      }
      const response = await saveRoleAccess(rolePermissions);

      navigate(role === 'admin' ? '/admin/access-control' : '/staff/access-control')
    } catch (error) {
      setError(error.message);
    } finally {
      setSuccessMessage(`Successfully Saved Role Access for Role Code: ${rolePermissions.roleCode}`)
      setPerformingChanges(!performingChanges);
    }
  }

  return { rolePermissions, permissionCategories, roles, loading, successMessage, error, setSuccessMessage, performingChanges,resetRolePermissions, updateRolePermissions, fetchRoles, fetchPermissions, fetchRolePermissions, handleSubmit };
}