import { Link, Outlet, useNavigate } from "react-router-dom";
import { useServiceConfiguration } from "../../hooks/useServiceConfiguration";
import Table from "../../components/Table/Table";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ServiceContextProvider } from "../../context/ServiceContext";
import { ServiceContext } from "../../context/ServiceContext";

export default function ServiceConfigurationMain() {

  const { performingChanges } = useContext(ServiceContext);
  const navigate = useNavigate();

  const { isAuthenticated, role } = useContext(AuthContext);
  const { tableData, loading, error, updateServiceDetails, fetchAllServiceRecords, handleAddButton, handleEdit, handleDelete } = useServiceConfiguration();


  // const headers = ['Product name', 'Color', 'Category', 'Price',];
  // const data = [
  //   ['Apple MacBook Pro 17"', 'Silver    9', 'Laptop', '$2999',],
  //   ['Apple MacBook Pro 17"', 'Silver   9', 'Laptop', '$2999',],
  //   ['Apple MacBook Pro 17"', 'Silver 67868687  677', 'Laptop', '$2999',],
  //   ['Apple MacBook Pro 17"', 'Silver', 'Laptop456465456465', '$2999',],
  // ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        await fetchAllServiceRecords();
      } catch (error) {
        console.error('Error fetching services', error);
      }
    }
    fetchServices();
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        await fetchAllServiceRecords();
      } catch (error) {
        console.error('Error fetching services', error);
      }
    }
    console.log('REFRESHED')
    fetchServices();
  }, [performingChanges])

  return (

    <div>
      <h1 className="px-8 py-6 text-3xl sm:px-7 md:px-11 md:py-6 md:text-4xl lg:px-11 md:text-left text-center font-bold text-gray-900">Service Configuration</h1>
      {tableData.headers.length > 0 && tableData.servicesData.length > 0 ?
        <Table headers={tableData.headers} data={tableData.servicesData} handleEdit={handleEdit} handleDelete={handleDelete} />
        :
        (
          <div className="relative overflow-auto shadow-md sm:rounded-lg md:m-16 m-3 h-80 flex items-center justify-center">
            <span className="text-red-500 text-lg">{error}</span>
          </div>
        )}

      {/* <div className="relative w-full h-10 mx-auto">
        <button
          onClick={()=> handleAddButton()}
          class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-4 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
          type="submit">
          Add New Service
        </button>
      </div> */}
      <div className="relative w-full h-10 mx-auto">
        <Link
          to={role === 'admin' ? '/admin/service-configurations/create' : '/staff/service-configurations/create'}
          className="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-4 w-40 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
          role="button"
        >
          <span className="inline-block w-full">Add New Service</span>
        </Link>
      </div>

      <Outlet />
    </div>

  );
}