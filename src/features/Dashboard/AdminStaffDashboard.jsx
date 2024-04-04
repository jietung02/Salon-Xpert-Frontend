
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAdminStaffDashboard } from "../../hooks/useAdminStaffDashboard";
import Table from "../../components/Table/Table";
export default function AdminStaffDashboard() {

  const { username, } = useContext(AuthContext);
  const { error, fetchDashboardData, dashboardData, tableData, } = useAdminStaffDashboard();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDashboardData();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Welcome {username}</h1>

      <div className="flex flex-col lg:flex-row items-start w-full">
        <div className="flex flex-col w-full lg:w-1/2">

          <div className="my-10 flex flex-col lg:flex-row w-full">
            <div className="relative flex flex-col justify-between w-4/5 mx-auto lg:w-5/12 bg-gray-50 rounded-lg shadow-md shadow-gray-300 gap-8 px-2 py-10 lg:px-10 2xl:px-14 mb-5">
              <span className="font-medium text-lg lg:text-xl 2xl:text-2xl text-center">Active Appointment(s)</span>
              <span className="text-lg lg:text-xl 2xl:text-2xl text-center">{dashboardData.totalActiveAppointments ?? 0}</span>
            </div>

            <div className="relative flex flex-col justify-between w-4/5 mx-auto lg:w-5/12 bg-gray-50 rounded-lg shadow-md shadow-gray-300 gap-8 px-2 py-10 lg:px-10 2xl:px-14 mb-5">
              <span className="font-medium text-lg lg:text-xl 2xl:text-2xl text-center">Total Customers</span>
              <span className="text-lg lg:text-xl 2xl:text-2xl text-center">{dashboardData.totalCustomers ?? 0}</span>
            </div>
          </div>

          <div className="mx-auto w-4/5 lg:w-11/12 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-col justify-center gap-8 px-2 py-10 lg:px-10 2xl:px-14 mb-10">
            <span className="font-medium text-lg lg:text-xl 2xl:text-2xl text-center">Total Services</span>
            <span className="text-lg lg:text-xl 2xl:text-2xl text-center">{dashboardData.totalServices ?? 0}</span>
          </div>
          <div className="flex justify-center items-center mt-3 h-16">
            <span className="font-semibold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">Service Staff</span>
          </div>
          <div className="flex flex-col lg:flex-row w-full">

            {tableData.headers.length > 0 && tableData.staffProfileData.length > 0 ?
              <Table headers={tableData.headers} data={tableData.staffProfileData} customHeight={true} />
              :
              (
                <div className="relative overflow-auto shadow-md sm:rounded-lg md:m-16 m-3 h-80 flex items-center justify-center">
                  <span className="text-red-500 text-lg">{error}</span>
                </div>
              )}

          </div>
        </div>

        <div className="my-10 flex flex-col lg:flex-row w-full lg:w-1/2">
          <div className="mx-auto w-11/12 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-col px-12 lg:px-10 2xl:px-12 py-12 custom-height-upcoming-appointment-adminstaff overflow-y-auto">
            <div className="flex justify-center mt-3 h-16">
              <span className="font-semibold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">Upcoming Appointments</span>
            </div>

            {Array.isArray(dashboardData.allUpcomingAppointments) && dashboardData.allUpcomingAppointments.length > 0 ? dashboardData.allUpcomingAppointments.map(value => {
              return (
                <div key={value.appointmentId} className="relative w-full mx-auto my-4 bg-gray-50 rounded-lg border-2 border-gray-900 break-words shadow-md shadow-gray-200 gap-8 px-12 lg:px-14 2xl:px-16 py-6">
                  <p className=" text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Appointment ID : </span><span>{value.appointmentId}</span></p>
                  <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Staff Name : </span><span>{value.staffName}</span></p>
                  <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Customer or Guest Name : </span><span>{value.name}</span></p>
                  <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Appointment Date Time : </span><span>{value.startDateTime}</span></p>
                  <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Services : </span><span>{value.services}</span></p>
                </div>)
            })
              :
              <div className="flex justify-center items-center h-4/5">
                <span className="text-xl lg:text-2xl 2xl:text-3xl text-gray-900">No Upcoming Appointments</span>
              </div>
            }

          </div>
        </div>
      </div>



    </>
  );
}