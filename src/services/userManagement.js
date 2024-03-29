export const fetchAllRoles = async () => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/user-management/roles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

export const createRole = async (roleDetails) => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/user-management/roles/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roleDetails)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

export const editRole = async (roleDetails) => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/user-management/roles/${roleDetails.roleCode}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roleDetails)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

export const deleteRole = async (roleCode) => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/user-management/roles/${roleCode}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const fetchAllRolesObj = async () => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/user-management/access-control/roles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

export const fetchAllPermissionCategories = async () => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/user-management/access-control/permission-categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
    //rmb to add to postman too, 
    // and perhaps create an endpoint in back end
}


export const fetchAllRolePermissions = async (roleCode) => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/user-management/access-control/role-permissions/${roleCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

export const saveRoleAccess = async (rolePermissions) => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_URI}/user-management/access-control/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rolePermissions)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}