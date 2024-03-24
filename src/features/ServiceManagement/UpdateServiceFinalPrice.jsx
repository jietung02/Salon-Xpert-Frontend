
import { useEffect } from "react";
import { useUpdateServiceFinalPrice } from "../../hooks/useUpdateServiceFinalPrice";
import Dropdown from "../../components/Dropdown/Dropdown";
import { InformationCircleIcon,ArrowPathIcon } from "@heroicons/react/24/solid";

export default function UpdateServiceFinalPrice() {


  const { loading, error, setError, successMessage, refresh, refreshPage, setSuccessMessage, fetchCurrentDateAppointments, appointments, selectedAppointment, updateSelectedAppointment, resetSelectedAppointment, resetPriceWhenAppointmentIsChanged, handleSubmit, } = useUpdateServiceFinalPrice();


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCurrentDateAppointments();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    resetSelectedAppointment();
    fetchData();
  }, [refresh]);

  useEffect(() => {
    resetPriceWhenAppointmentIsChanged();
  }, [selectedAppointment.appointmentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCurrentDateAppointments();
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
        await fetchCurrentDateAppointments();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, []);


  return (
    <div>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Update Service Price</h1>

      {successMessage && (
        <div class="flex w-3/5 mx-auto items-center p-4 lg:mt-10 text-xl 2xl:text-2xl text-white rounded-lg bg-green-800" role="alert">
          <InformationCircleIcon className="h-6 w-6" />
          <span class="sr-only">Info</span>
          <div>
            <span className="pl-2">{successMessage}</span>
          </div>
        </div>
      )}

      <form className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12" onSubmit={(e) => handleSubmit(e)}>
        <div className="relative w-full">
          <div className="flex justify-center items-center mb-4 h-16">
            <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">Choose An Appointment</span>
            <button
              type='button'
              className="absolute top-0 right-0 mt-1 mr-1 md:mr-4"
              onClick={() => {
                setError(null);
                refreshPage();
              }}
            >
              <ArrowPathIcon className="h-6 w-6 hover:text-gray-500" color="#111827" />
            </button>
          </div>
        </div>


        {error && (
          <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
          </div>
        )}

        <Dropdown
          isSelected={selectedAppointment.appointmentId}
          label='Appointment'
          name='appointmentId'
          handleOnChange={updateSelectedAppointment}
          options={[
            { label: '', value: '' },
            ...(Array.isArray(appointments) && appointments.map((appointment) => ({
              value: appointment.appointmentId,
              label: `Staff: ${appointment.staffName}, Customer: ${appointment.name}`,
            })))
          ]} />

        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            disabled={selectedAppointment.appointmentId === null || selectedAppointment.appointmentId === ''}
            type="number"
            step="any"
            name="serviceFinalPrice"
            value={selectedAppointment.serviceFinalPrice !== null ? selectedAppointment.serviceFinalPrice : ''}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateSelectedAppointment(e)}
            min={
              appointments && selectedAppointment.appointmentId
                ? parseFloat(
                  appointments.find((value) => value.appointmentId === selectedAppointment.appointmentId)?.estimatedPrice || 0
                )
                : 0
            }
            max="50000.00"
            title="Final Service Price must not Less than Estimated Price"
            onInvalid={(e) => e.target.setCustomValidity(`Final Service Price must not be less than Estimated Price: RM${e.target.min}`)}
            onInput={(e) => e.target.setCustomValidity("")}
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Final Service Price (RM)
          </label>
        </div>

        <div className="relative w-full h-12 2xl:h-14 mx-auto">
          <button
            disabled={loading}
            class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
            type="submit">
            Set Final Price
          </button>
        </div>

      </form>
    </div>
  );
};