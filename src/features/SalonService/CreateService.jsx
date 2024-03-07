import { useContext, useEffect } from "react";
import { ServiceContext } from "../../context/ServiceContext";
import { useServiceConfiguration } from "../../hooks/useServiceConfiguration";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function CreateService() {
  const {role} = useContext(AuthContext);
  const { serviceDetails, updateServiceDetails, clearServiceDetails } = useContext(ServiceContext);
  const { loading, error, handleSubmitForCreation } = useServiceConfiguration();
  useEffect(() => {
    clearServiceDetails();
  }, []);

  return (
    <div>
      <form className="my-4 container mx-auto w-5/6 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 py-12 mx-auto" onSubmit={(e) => handleSubmitForCreation(e)}>
        <div className="relative w-full">
          <div className="flex justify-center items-center mb-4 h-16">
            <span className="font-bold text-xl text-gray-900">New Service</span>
          </div>
          <div className="absolute top-0 right-0 mt-1 mr-1 md:mr-4">
            <Link to={role === 'admin' ? '/admin/service-configurations' : '/staff/service-configurations'} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-6 w-6 hover:text-gray-500" color="#111827" />
            </Link>
          </div>
        </div>

        {error && (
          <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xs">{error}</span>
          </div>
        )}
        <div className="relative md:w-2/5 w-full h-10 mx-auto">
          <input
            type="text"
            name="serviceCode"
            value={serviceDetails.serviceCode !== null ? serviceDetails.serviceCode : ''}
            className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateServiceDetails(e)}
            pattern="^[A-Z_]+$"
            title="Only uppercase letters and underscores are allowed"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Service Code (e.g. HAIR_COLOR)
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-10 mx-auto">
          <input
            type="text"
            name="serviceName"
            value={serviceDetails.serviceName !== null ? serviceDetails.serviceName : ''}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateServiceDetails(e)}
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Service Name
          </label>
        </div>


        <div className="relative md:w-2/5 w-full h-10 mx-auto">
          <input
            type="number"
            name="serviceDuration"
            value={serviceDetails.serviceDuration !== null ? serviceDetails.serviceDuration : ''}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateServiceDetails(e)}
            min="0"
            max="540"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Service Duration (Minutes)
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-10 mx-auto">
          <input
            type="number"
            step="any"
            name="serviceBasedPrice"
            value={serviceDetails.serviceBasedPrice !== null ? serviceDetails.serviceBasedPrice : ''}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateServiceDetails(e)}
            min="0.00"
            max="50000.00"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Service Price
          </label>
        </div>

        <div className="relative w-full h-10 mx-auto">
          <button
            disabled={loading}
            class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-4 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
            type="submit">
            Create
          </button>
        </div>

      </form>
    </div >
  );
}