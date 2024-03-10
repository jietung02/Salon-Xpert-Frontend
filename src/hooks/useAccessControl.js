import { useState } from "react";
import { fetchAllRolesObj, fetchPermissionCategories } from "../services/userManagement";

export const useAccessControl = () => {

  const [rolePermissions, setRolePermissions] = useState({
    roleCode: null,
    permissions: [],
  });

  const [roles, setRoles] = useState([]);
  const [permissionCategories, setPermissionCategories] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateRolePermissions = (e) => {
    if (e.hasOwnProperty('target')) {
      const { name, value, type, checked } = e.target;

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
      const categories = await fetchPermissionCategories();
      setPermissionCategories(categories.data);

    } catch (error) {
      setError(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

    } catch (error) {

    }
  }

  return { rolePermissions, permissionCategories, roles, loading, error, updateRolePermissions, fetchRoles, fetchPermissions, handleSubmit };
}