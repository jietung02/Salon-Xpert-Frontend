import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useDashboardCustomer } from "../../hooks/useDashboardCustomer";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function DashboardCustomer() {

  const { role, name } = useContext(AuthContext);
  const { loading, error, setError, successMessage, setSuccessMessage, fetchDashboardData, upcomingAppointments, statisticData, handleCancelAppointment, } = useDashboardCustomer();


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDashboardData();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    fetchData();
    return () => clearTimeout(timer);

  }, [successMessage]);

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
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Welcome {name}</h1>

      {successMessage && (
        <div class="flex w-3/5 mx-auto items-center p-4 lg:mt-10 text-xl 2xl:text-2xl text-white rounded-lg bg-green-800" role="alert">
          <InformationCircleIcon className="h-6 w-6" />
          <span class="sr-only">Info</span>
          <div>
            <span className="pl-2">{successMessage}</span>
          </div>
        </div>
      )}

      {error && (
        <div class="w-11/12 mx-auto text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
          <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
        </div>
      )}

      {role && role === 'customer' &&
        (<div className="my-10 flex flex-col md:flex-row md:items-end w-full">
          <div className="relative flex flex-col justify-between w-4/5 mx-auto md:w-5/12 bg-gray-50 rounded-lg shadow-md shadow-gray-300 gap-8 px-2 py-10 lg:px-10 2xl:px-14 mb-10">
            <span className="font-medium text-lg lg:text-xl 2xl:text-2xl text-center">Total Appointment(s) Completed</span>
            <span className="text-lg lg:text-xl 2xl:text-2xl text-center">{statisticData.totalAppointmentsCompleted && statisticData.totalAppointmentsCompleted !== null ? statisticData.totalAppointmentsCompleted : 0}</span>
          </div>
          <div className="relative flex flex-col justify-between w-4/5 mx-auto md:w-5/12 bg-gray-50 rounded-lg shadow-md shadow-gray-300 gap-8 px-2 py-10 lg:px-10 2xl:px-14 mb-10">
            <span className="font-medium text-lg lg:text-xl 2xl:text-2xl text-center">Top Selected Service</span>
            <span className="text-lg lg:text-xl 2xl:text-2xl text-center">{statisticData.topSelectedService && statisticData.topSelectedService !== null ? statisticData.topSelectedService : '-'}</span>
          </div>
        </div>)
      }

      <div className="my-3 mx-auto w-9/12 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-col justify-center md:justify-start  gap-8 px-12 lg:px-20 2xl:px-24 py-12 custom-height-upcoming-appointment overflow-auto">
        <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl text-gray-900 text-center md:text-left">Upcoming Appointment(s)</span>

        {Array.isArray(upcomingAppointments) && upcomingAppointments.length > 0 ? upcomingAppointments.map(value => {

          return (
            <div key={value.appointmentId} className="relative my-3 w-full mx-auto w-9/12 break-words bg-gray-50 rounded-lg shadow-md shadow-gray-200 gap-8 px-12 lg:px-20 2xl:px-24 py-12">
              <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Appointment ID : </span><span>{value.appointmentId}</span></p>
              <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Staff Name : </span><span>{value.staffName}</span></p>
              <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Appointment Date Time : </span><span>{value.startDateTime}</span></p>
              <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Services : </span><span>{value.services}</span></p>
              <br />
              <button
                disabled={loading}
                onClick={() => { handleCancelAppointment(value.appointmentId) }}
                className="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-lg lg:text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3 bg-red-500 text-white"
                type="button" // Change type to "button" for non-submit buttons
              >
                Cancel Appointment
              </button>

            </div>

          );
        }) :
          <div className="relative overflow-auto  md:m-16 m-3 h-80 flex items-center justify-center">
            <span className="text-xl lg:text-2xl 2xl:text-3xl text-gray-900">No Upcoming Appointments</span>
          </div>
        }


      </div>


    </>
  );
}