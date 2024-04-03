import { useEffect } from "react";
import { useAppointmentHistory } from "../../hooks/useAppointmentHistory";

export default function ViewAppointmentHistory() {

  const { error, fetchAppointmentHistory, pastAppointments, } = useAppointmentHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAppointmentHistory();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Appointment History</h1>

      <div className="my-6 mx-auto w-4/5 bg-gray-50 custom-height-appointment-history rounded-lg shadow-md shadow-gray-300 px-12 lg:px-20 2xl:px-24 py-12 overflow-auto">
        <div className="flex mx-auto justify-center mt-3 h-16">
          <span className="mx-auto font-semibold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">Past Appointments</span>
        </div>

        {Array.isArray(pastAppointments) && pastAppointments.length > 0 ? pastAppointments.map(value => {
          return (
            <div key={value.appointmentId} className="relative w-full mx-auto mb-10 bg-gray-50 rounded-lg border-2 border-gray-900 items-start break-words shadow-md shadow-gray-200 gap-8 px-12 lg:px-14 2xl:px-16 py-6">
              <p className=" text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Appointment ID : </span><span>{value.appointmentId}</span></p>
              <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Staff Name : </span><span>{value.staffName}</span></p>
              <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Appointment Date Time : </span><span>{value.appointmentDateTime}</span></p>
              <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Final Price : </span><span>RM{value.finalPrice}</span></p>
              <p className="text-lg lg:text-xl 2xl:text-2xl text-left"><span className="font-medium">Service(s) : </span><span>{value.services}</span></p>
            </div>
          );
        })
          :
          <div className="flex justify-center items-center h-4/5">
            <span className="text-xl lg:text-2xl 2xl:text-3xl text-gray-900">No Past Appointments</span>
          </div>
        }

      </div>

    </>
  );
}