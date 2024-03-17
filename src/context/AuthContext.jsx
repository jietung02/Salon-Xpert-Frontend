import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {

    switch (action.type) {

        case 'LOGIN':
            return {
                ...state,
                ...action.payload,
            };
        case 'RELOAD':
            return {
                ...state,
                ...action.payload,
            };
        case 'LOGOUT':
            return {
                isAuthenticated: null,
                username: null,
                customerId: null,
                name: null,
                email: null,
                gender: null,
                age: null,
                contact: null,
                role: null,
                permissions: null,
                token: null,
                isLoggedOut: true,
            };
        case 'RESETLOGOUT':
            return {
                ...state,
                isLoggedOut: false,
            }
        case 'GUESTLOGIN':
            return {
                ...state,
                ...action.payload,
            }
        case 'EDITPROFILE':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

//FOR TESTING PURPOSE
// const userData = {
//     isAuthenticated: true,
//     username: 'Jie',
//     role: 'staff',
//     permissions: [
//         {
//             rolePermission: 'Service Management',
//             functions: [{ name: 'Update Service Price', route: '/staff/update-service-price' }, { name: 'View Own Schedule', route: '/staff/view-schedule' }],
//         },
//         {
//             rolePermission: 'Dashboard',
//             functions: [{ name: 'Dashboard', route: '/staff' }, { name: 'View all Staff Schedules', route: '/staff/staff-schedules' }],
//         },
//         {
//             rolePermission: 'User Management',
//             functions: [{ name: 'Manage Roles', route: '/staff/roles' }, { name: 'Access Control', route: '/staff/access-control' }],
//         },

//     ],
//     token: 'JWT token',
//     isLoggedOut: false,
// };



export const AuthContextProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(authReducer, userData);

    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        username: null,
        customerId: null,
        name: null,
        email: null,
        gender: null,
        age: null,
        contact: null,
        role: null,
        permissions: null,
        token: null,
        isLoggedOut: null,
    });

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
