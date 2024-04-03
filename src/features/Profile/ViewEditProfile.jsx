import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useProfile } from "../../hooks/useProfile";
import Dropdown from "../../components/Dropdown/Dropdown";
import useScreenSize from "../../hooks/useScreenSize";
import { DatePicker } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function ViewEditProfile() {

  const { loading, error, successMessage, setError, setSuccessMessage, profileDetails, setProfileDetails, updateProfileDetails, fetchProfileDetails, handleSave, } = useProfile();
  const { width } = useScreenSize();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProfileDetails();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    if (successMessage !== null) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      fetchData();

      return () => clearTimeout(timer);
    };

  }, [successMessage]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        await fetchProfileDetails();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();

  }, []);

  return (
    <div>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Profile</h1>
      <form className="my-6 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap lg:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12 mx-auto" onSubmit={(e) => handleSave(e)}>
        <div className="relative w-full">
          <div className="flex justify-center items-center  h-16">
            <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">Profile Details</span>
          </div>

        </div>

        {successMessage && (
          <div class="flex w-3/5 mx-auto mb-6 items-center p-4  text-xl 2xl:text-2xl text-white rounded-lg bg-green-800" role="alert">
            <InformationCircleIcon className="h-6 w-6" />
            <span class="sr-only">Info</span>
            <div>
              <span className="pl-2">{successMessage}</span>
            </div>
          </div>
        )}

        {error && (
          <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
          </div>
        )}
        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="text"
            readOnly={true}
            name="username"
            value={profileDetails.username !== null ? profileDetails.username : ''}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            pattern="^[a-zA-Z0-9_]{3,20}$"
            title="Please enter a username between 3 and 20 characters, using only letters (both lowercase and uppercase), digits, or underscores."
            autocomplete="one-time-code"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Username
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="password"
            name="password"
            value={profileDetails.password !== null ? profileDetails.password : ''}
            className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateProfileDetails(e)}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
            title="Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long"
            autocomplete="one-time-code"
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Password (optional)
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="text"
            name="name"
            value={profileDetails.name !== null ? profileDetails.name : ''}
            className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateProfileDetails(e)}
            pattern="[a-zA-Z\s]{2,50}"
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
            type="email"
            name="email"
            value={profileDetails.email !== null ? profileDetails.email : ''}
            className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateProfileDetails(e)}
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Email
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-12 2xl:h-14  mx-auto mb-auto">
          <input
            type="tel"
            name="contact"
            value={profileDetails.contact !== null ? profileDetails.contact : ''}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateProfileDetails(e)}
            pattern="[0-9]{1,3}-[0-9]{7,8}"
            title="Please Follow this format 01X-XXXXXXX"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Contact Number
          </label>
        </div>

        <Dropdown
          disabled={true}
          isSelected={profileDetails.gender}
          label='Gender'
          name='gender'
          handleOnChange={updateProfileDetails}
          loadSelection={profileDetails.gender}
          options={[{ label: '', value: '' }, { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
        />

        {width > 768 ? (
          <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
            <DatePicker
              className="w-full"
              value={profileDetails.birthdate ? dayjs(profileDetails.birthdate) : null}
              label="Birthdate"
              slotProps={{ textField: { size: 'medium' } }}
              name="birthdate"
              format="DD/MM/YYYY"
              views={['day', 'month', 'year']}
              onError={(newError) => setError(newError)}
              disableFuture

              onAccept={(e) => { updateProfileDetails(e, 'birthdate') }}
            />
          </div>
        ) : (
          <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
            <MobileDatePicker
              className="w-full"
              value={profileDetails.birthdate ? dayjs(profileDetails.birthdate) : null}
              label="Birthdate"
              slotProps={{ textField: { size: 'medium' } }}
              name="birthdate"
              format="DD/MM/YYYY"
              views={['day', 'month', 'year']}
              onError={(newError) => setError(newError)}
              disableFuture

              onAccept={(e) => { updateProfileDetails(e, 'birthdate') }}
            />
          </div>
        )}

        <div className="relative w-full h-12 2xl:h-14 mx-auto mt-3">
          <button
            disabled={loading}
            class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
            type="submit">
            Save
          </button>
        </div>

      </form>
    </div >
  );
}