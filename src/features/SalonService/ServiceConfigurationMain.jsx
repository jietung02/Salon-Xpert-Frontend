import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useServiceConfiguration } from "../../hooks/useServiceConfiguration";
import Table from "../../components/Table/Table";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ServiceContext } from "../../context/ServiceContext";
import { InformationCircleIcon } from "@heroicons/react/24/solid";


export default function ServiceConfigurationMain() {
  let location = useLocation();
  const [successMessage, setSuccessMessage] = useState(null);
  const { serviceDetails, performingChanges } = useContext(ServiceContext);
  const navigate = useNavigate();

  const { role } = useContext(AuthContext);
  const { tableData, loading, error, updateServiceDetails, fetchAllServiceRecords, handleAddButton, handleEdit, handleDelete } = useServiceConfiguration();


  useEffect(() => {

    const fetchServices = async () => {
      try {
        await fetchAllServiceRecords();
      } catch (error) {
        console.error('Error fetching services', error);
      }
    }
    fetchServices();
  }, []);

  useEffect(() => {
    if (location.state) {
      const { successMessage: msg } = location.state;
      console.log(msg)
      setSuccessMessage(msg);
    }
    const fetchServices = async () => {
      try {
        await fetchAllServiceRecords();
      } catch (error) {
        console.error('Error fetching services', error);
      }
    }
    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);


    fetchServices();
    return () => clearTimeout(timer);

  }, [performingChanges]);


  return (

    <div>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Services Configuration</h1>

      {successMessage && (
        <div class="flex w-3/5 mx-auto items-center p-4 lg:mt-10 text-xl 2xl:text-2xl text-white rounded-lg bg-green-800" role="alert">
          <InformationCircleIcon className="h-6 w-6" />
          <span class="sr-only">Info</span>
          <div>
            <span className="pl-2">{successMessage}</span>
          </div>
        </div>
      )}

      {tableData.headers.length > 0 && tableData.servicesData.length > 0 ?
        <Table headers={tableData.headers} data={tableData.servicesData} handleEdit={handleEdit} handleDelete={handleDelete} />
        :
        (
          <div className="relative overflow-auto shadow-md sm:rounded-lg md:m-16 m-3 h-80 flex items-center justify-center">
            <span className="text-red-500 text-lg">{error}</span>
          </div>
        )}

      <div className="relative w-full h-12 2xl:h-14 mx-auto">
        <Link
          to={role === 'admin' ? '/admin/service-configurations/create' : '/staff/service-configurations/create'}
          className="align-middle select-none font-bold text-center text-xl 2xl:text-2xl transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-5 rounded-lg w-60 border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
          role="button"
        >
          <span className="inline-block w-full">Add New Service</span>
        </Link>
      </div>

      <Outlet />
    </div>

  );
}