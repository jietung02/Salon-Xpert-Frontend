import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SideBarMenuItem({ isSelected, name, path, }) {

  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    sessionStorage.removeItem('authData');

    dispatch({ type: 'LOGOUT' })
  };

  let className = 'block px-5 py-2 mt-2 text-sm font-semibold text-gray-50 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline';

  // Add additional classNames based on isSelected prop
  if (isSelected) {
    className = 'block px-5 py-2 mt-2 text-sm font-semibold text-gray-50 bg-gray-200 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline';
  }

  if (name === 'Log Out') {
    className = 'block px-5 py-2 mt-3 text-sm font-semibold text-gray-50 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline';
  }

  return (
    <>
      <Link
        to={path}
        className={`${className}`}
        onClick={name === 'Log Out' ? handleLogout : undefined}
      >
        {name}
      </Link>

    </>

  );
}