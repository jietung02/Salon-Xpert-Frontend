import { useParams } from "react-router-dom";
import { useMakeFullPayment } from "../../hooks/useMakeFullPayment";
import { useEffect } from "react";
import { InformationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function MakeFullPaymentPage() {

  const { loading, error, success, setSuccess, appointmentDetails, fetchAppointment, handlePayNow, } = useMakeFullPayment();
  const { appointmentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {

        await fetchAppointment(appointmentId);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Payment Page</h1>

      <form className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12" onSubmit={(e) => handlePayNow(e)}>
        {success && <span className="relative w-full h-12 2xl:h-14 flex items-center justify-center">
          <CheckCircleIcon className="h-20 w-20" color="green" />
        </span>}

        <div className="relative w-full h-12 2xl:h-14 flex items-center justify-center mb-4">
          <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">{success ? 'Payment Successful and Appointment Completed' : 'Appointment Details'}</span>
        </div>

        {error && (
          <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
          </div>
        )}

        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="text"
            readOnly={true}
            name="appointmentId"
            value={appointmentDetails.appointmentId !== null ? appointmentDetails.appointmentId : ''}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Appointment ID
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="text"
            readOnly={true}
            name="services"
            value={appointmentDetails.services !== null ? appointmentDetails.services : ''}
            className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Services
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="text"
            readOnly={true}
            name="name"
            value={appointmentDetails.name !== null ? appointmentDetails.name : ''}
            className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            pattern="^[a-zA-Z0-9_]{3,20}$"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Name
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="text"
            readOnly={true}
            name="staffName"
            value={appointmentDetails.staffName !== null ? appointmentDetails.staffName : ''}
            className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
            autocomplete="one-time-code"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Staff Name
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="text"
            readOnly={true}
            name="appointmentDateTime"
            value={appointmentDetails.appointmentDateTime !== null ? appointmentDetails.appointmentDateTime : ''}
            className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Appointment Date Time
          </label>
        </div>

        {!success &&
          (
            <>
              <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
                <input
                  type="number"
                  readOnly={true}
                  name="finalPrice"
                  value={appointmentDetails.finalPrice !== null ? appointmentDetails.finalPrice : ''}
                  className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
                  placeholder=""
                  required
                />
                <label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
                >
                  Final Price (RM)
                </label>
              </div>



              <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
                <input
                  type="number"
                  readOnly={true}
                  name="depositPaid"
                  value={appointmentDetails.depositPaid !== null ? appointmentDetails.depositPaid : ''}
                  className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
                  placeholder=""
                  required
                />
                <label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
                >
                  Deposit Paid (RM)
                </label>
              </div>

              <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
                <input
                  type="number"
                  readOnly={true}
                  name="remainingAmount"
                  value={appointmentDetails.remainingAmount !== null ? appointmentDetails.remainingAmount : ''}
                  className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
                  placeholder=""
                  required
                />
                <label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
                >
                  Remaining Amount (RM)
                </label>
              </div>
            </>
          )}

        {success && <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="number"
            readOnly={true}
            name="finalPrice"
            value={appointmentDetails.finalPrice !== null ? appointmentDetails.finalPrice : ''}
            className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Total Paid (RM)
          </label>
        </div>}

        {!success && <div className="relative w-full h-12 2xl:h-14 mx-auto">
          <button
            disabled={loading}
            class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-4 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
            type="submit">
            Pay Now
          </button>
        </div>}

      </form>
    </div >
  );
};