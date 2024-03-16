import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStaffProfileConfiguration } from "../../hooks/useStaffProfileConfiguration";
import Table from "../../components/Table/Table";
import { AuthContext } from "../../context/AuthContext";
import { StaffProfileContext } from "../../context/StaffProfileContext";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function StaffProfileConfigurationMain() {
  let location = useLocation();
  const { role } = useContext(AuthContext);
  const { performingChanges } = useContext(StaffProfileContext);
  const { loading, error, tableData, fetchAllProfiles, fetchRoles, handleEdit, handleDelete } = useStaffProfileConfiguration();

  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        await fetchAllProfiles();
        await fetchRoles();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (location.state) {
      const { successMessage: msg } = location.state;
      console.log(msg)
      setSuccessMessage(msg);
    }
    const fetchProfiles = async () => {
      try {
        await fetchAllProfiles();
      } catch (error) {
        console.error('Error fetching staff profiles', error);
      }
    }
    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    fetchProfiles();
    return () => clearTimeout(timer);

  }, [performingChanges])

  return (
    <div>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Staff Profiles Configuration</h1>

      {successMessage && (
        <div class="flex w-3/5 mx-auto items-center p-4 lg:mt-10 text-xl 2xl:text-2xl text-white rounded-lg bg-green-800" role="alert">
          <InformationCircleIcon className="h-6 w-6" />
          <span class="sr-only">Info</span>
          <div>
            <span className="pl-2">{successMessage}</span>
          </div>
        </div>
      )}

      {tableData.headers.length > 0 && tableData.staffProfilesData.length > 0 ?
        <Table headers={tableData.headers} data={tableData.staffProfilesData} handleEdit={handleEdit} handleDelete={handleDelete} />
        :
        (
          <div className="relative overflow-auto shadow-md sm:rounded-lg md:m-16 m-3 h-80 flex items-center justify-center">
            <span className="text-red-500 text-lg">{error}</span>
          </div>
        )}

      <div className="relative w-full h-12 2xl:h-14 mx-auto">
        <Link
          to={role === 'admin' ? '/admin/staff-profile-configurations/create' : '/staff/staff-profile-configurations/create'}
          className="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 w-72 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
          role="button"
        >
          <span className="inline-block w-full">Add New Staff Profile</span>
        </Link>
      </div>

      <Outlet />
    </div>

  );
}