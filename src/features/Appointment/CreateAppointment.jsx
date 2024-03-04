


import { useAppontmentBooking } from "../../hooks/useAppointmentBooking";
import { appointDetails, services, updateAppointmentDetails, resetAppointmentDetails, bookAppointment, fetchServices, fetchSpecialists } from "../../hooks/useAppointmentBooking";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import RadioButton from "../../components/RadioButton/RadioButton";
import Checkbox from "../../components/Checkbox/Checkbox";
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import useScreenSize from "../../hooks/useScreenSize";
import { AuthContext } from "../../context/AuthContext";
import dayjs from "dayjs";

export default function CreateAppointment() {
  const { name, email, gender, age, contact } = useContext(AuthContext);

  const { width } = useScreenSize();
  const { appointDetails, services, loading, error, specialists, setErrorMessage, updateAppointmentDetails, setAvailableTimeSlots, handleSubmit, fetchServices, fetchSpecialists, setSpecialists, shouldDisableTime, fetchAvailableTimeSlot, fetchWorkingTimeSlots, fetchSpecialistAvailability } = useAppontmentBooking();
  const [selectedValue, setSelectedValue] = useState('');
  useEffect(() => {

    const fetchData = async () => {
      try {
        if (name !== null && email !== null && gender !== null && age !== null && contact !== null) {
          console.log('iNNIN')
          const userDetails = [
            { name: 'name', value: name },
            { name: 'email', value: email },
            { name: 'gender', value: gender },
            { name: 'age', value: age },
            { name: 'contact', value: contact }
          ];

          userDetails.map(({ name, value }) => {
            updateAppointmentDetails({ target: { name: [name], value: value } });
          });
        }
        console.log('i89080')
        await fetchServices();

      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }
    fetchData();
  }, [])

  const clearDropdownSelection = () => {
    updateAppointmentDetails({ target: { name: 'selectedSpecialist', value: null, } })

  };
  const resetDateTime = () => {
    updateAppointmentDetails({}, 'selectedDate', true);
    updateAppointmentDetails({}, 'selectedTime', true);
  }

  const resetTime = () => {
    updateAppointmentDetails({}, 'selectedTime', true);
  }


  useEffect(() => {
    const fetchSpecialistData = async () => {
      try {

        if (appointDetails.bookingMethod === 'specialist') {
          clearDropdownSelection();
          setSpecialists([]);
          setAvailableTimeSlots([]);
          resetDateTime();
          console.log('INN')
          await fetchSpecialists();
        }
        else {
          clearDropdownSelection();
          resetDateTime();
          setSpecialists([]);
          await fetchSpecialists();
        }

      } catch (error) {
        console.error('Error fetching specialists:', error);
      }
    }

    fetchSpecialistData();
  }, [appointDetails.bookingMethod, appointDetails.selectedServices]);

  useEffect(() => {
    const fetchSpecialistTimeSlot = async () => {
      try {
        await fetchAvailableTimeSlot();
      } catch (error) {
        console.error('Error fetching specialists timeslot:', error);
      }
    }
    if (appointDetails.bookingMethod === 'specialist' && appointDetails.selectedSpecialist !== null && appointDetails.selectedDate !== null) {
      resetTime();
      fetchSpecialistTimeSlot();
    }

  }, [appointDetails.selectedSpecialist, appointDetails.selectedDate]);

  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        await fetchWorkingTimeSlots();
      } catch (error) {
        console.error('Error fetching working hours', error);
      }
    }

    if (appointDetails.bookingMethod === 'datetime') {
      fetchWorkingHours();
    }
  }, [appointDetails.bookingMethod])

  useEffect(() => {
    if (appointDetails.bookingMethod === 'datetime') {
      clearDropdownSelection();
      // if (appointDetails.selectedTime !== null) {
      //   const date = new Date(appointDetails.selectedDate);
      //   const time = new Date(appointDetails.selectedTime);

      //   if (date.getDate() !== time.getDate()) {
      //     updateAppointmentDetails({ $H: time.getHours(), $m: time.getMinutes() }, 'selectedTime')
      //   }
      // }

    }

    const fetchSpecialistAvailableThatTime = async () => {
      try {
        await fetchSpecialists();
        if (appointDetails.bookingMethod === 'datetime' && specialists.length !== 0 && appointDetails.selectedTime !== null) {
          await fetchSpecialistAvailability();
        }
      } catch (error) {
        console.error('Error fetching specialists', error);
      }
    }
    fetchSpecialistAvailableThatTime();

  }, [appointDetails.selectedTime, appointDetails.selectedDate])

  useEffect(() => {
    if (appointDetails.bookingMethod === 'datetime') {
      resetTime();
    }

  }, [appointDetails.selectedDate])

  return (
    <div>
      <h1 className="px-8 py-6 text-3xl sm:px-7 md:px-11 md:py-6 md:text-4xl lg:px-11 md:text-left text-center font-bold text-gray-900">Book Appointment</h1>
      <form className="my-6 container mx-auto w-5/6 bg-gray-100 rounded-lg shadow-md shadow-gray-200 flex flex-wrap md:items-end gap-8 px-12 py-12 mx-auto" onSubmit={(e) => handleSubmit(e)}>
        {error && (
          <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xs">{error}</span>
          </div>
        )}
        <div className="relative md:w-2/5 w-full h-10 mx-auto">
          <input
            type="text"
            readOnly={name !== null}
            name="name"
            value={name !== null ? name : appointDetails.name}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateAppointmentDetails(e)}
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Name
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-10 mx-auto">
          <input
            type="email"
            readOnly={email !== null}
            name="email"
            value={email !== null ? email : appointDetails.email}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateAppointmentDetails(e)}
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Email
          </label>
        </div>

        <Dropdown disabled={gender !== null} isSelected={appointDetails.gender} label='Gender' name='gender' handleOnChange={updateAppointmentDetails} loadSelection={gender} options={[{ label: '', value: '' }, { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]} />

        <div className="relative md:w-2/5 w-full h-10 mx-auto">
          <input
            type="number"
            readOnly={age !== null}
            name="age"
            value={age !== null ? age : appointDetails.age}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateAppointmentDetails(e)}
            min="0"
            max="100"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Age
          </label>
        </div>

        <div className="relative md:w-2/5 w-full h-10  mx-auto mb-auto">
          <input
            type="tel"
            readOnly={contact !== null}
            name="contact"
            value={contact !== null ? contact : appointDetails.contact}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateAppointmentDetails(e)}
            pattern="[0-9]{1,3}-[0-9]{7,8}"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Contact Number (01X-XXXXXXX)
          </label>
        </div>

        <Checkbox
          label='Service Type'
          checkBoxGroupName='selectedServices'
          selectedServices={appointDetails.selectedServices}
          handleOnChange={updateAppointmentDetails}
          options={(services && services.map((service) => {

            return {
              uniqueId: service.serviceCode,
              value: service.serviceName,
            }
          }))} />

        <RadioButton bookingMethod={appointDetails.bookingMethod} name='bookingMethod' label='Choose Booking Method' handleOnChange={updateAppointmentDetails} options={[{ id: 'specialist', value: 'specialist', label: 'Select Specialist First' }, { id: 'datetime', value: 'datetime', label: 'Select Date and Time First' }]} />

        {appointDetails.bookingMethod && appointDetails.bookingMethod === 'specialist' ? (
          <>
            <Dropdown
              disabled={appointDetails.selectedServices.length === 0}
              isSelected={appointDetails.selectedSpecialist}
              label='Select a Specialist'
              name='selectedSpecialist'
              handleOnChange={updateAppointmentDetails}
              options={[
                { label: '', value: '' },
                ...(specialists && specialists.map((specialist) => ({
                  value: specialist.staffId,
                  label: specialist.staffName,
                })))
              ]} />


            {width > 768 ? (
              <>
                <div className="relative md:w-2/5 w-full h-10 mx-auto">
                  <DatePicker
                    value={appointDetails.selectedDate ? dayjs(appointDetails.selectedDate) : null}
                    disabled={appointDetails.selectedServices.length === 0 || appointDetails.selectedSpecialist === null}
                    label="Select Service Date"
                    slotProps={{ textField: { size: 'small' } }}
                    name="selectedDate"
                    format="DD/MM/YYYY"
                    views={['day', 'month', 'year']}
                    onError={(newError) => setErrorMessage(newError)}
                    disablePast

                    onAccept={(e) => { updateAppointmentDetails(e, 'selectedDate') }}
                  />
                </div>

                <div className="relative md:w-2/5 w-full h-10 mx-auto">
                  <TimePicker
                    disabled={appointDetails.selectedDate === null}
                    value={appointDetails.selectedTime ? dayjs(appointDetails.selectedTime) : null}
                    label="Select Service Time"
                    skipDisabled
                    shouldDisableTime={shouldDisableTime}
                    slotProps={{ textField: { size: 'small' } }}
                    name="selectedTime"
                    onError={(newError) => setErrorMessage(newError)}
                    minutesStep={15}
                    ampm={false}
                    onAccept={(e) => { updateAppointmentDetails(e, 'selectedTime') }}
                  />
                </div>
              </>
            ) :
              <>
                <div className="relative md:w-2/5 w-full h-10 mx-auto">
                  <MobileDatePicker
                    disabled={appointDetails.selectedServices.length === 0 || appointDetails.selectedSpecialist === null}
                    value={appointDetails.selectedDate ? dayjs(appointDetails.selectedDate) : null}
                    label="Select Service Date"
                    slotProps={{ textField: { size: 'small' } }}
                    name="selectedDate"
                    format="DD/MM/YYYY"
                    views={['day', 'month', 'year']}
                    onError={(newError) => setErrorMessage(newError)}
                    disablePast
                    onAccept={(e) => { updateAppointmentDetails(e, 'selectedDate') }}
                    className="w-full"
                  />
                </div>

                <div className="relative md:w-2/5 w-full h-10 mx-auto">
                  <MobileTimePicker
                    disabled={appointDetails.selectedDate === null}
                    value={appointDetails.selectedTime ? dayjs(appointDetails.selectedTime) : null}
                    label="Select Service Time"
                    skipDisabled
                    shouldDisableTime={shouldDisableTime}
                    slotProps={{ textField: { size: 'small' } }}
                    name="selectedTime"
                    onError={(newError) => setErrorMessage(newError)}
                    minutesStep={15}
                    ampm={false}
                    onAccept={(e) => { updateAppointmentDetails(e, 'selectedTime') }}
                    className="w-full"

                  />
                </div>
              </>
            }

          </>
        ) : <></>
        }

        {appointDetails.bookingMethod && appointDetails.bookingMethod === 'datetime' ?
          <>
            {width > 768 ? (
              <>
                <div className="relative md:w-2/5 w-full h-10 mx-auto">
                  <DatePicker
                    disabled={appointDetails.selectedServices.length === 0}
                    value={appointDetails.selectedDate ? dayjs(appointDetails.selectedDate) : null}
                    label="Select Service Date"
                    slotProps={{ textField: { size: 'small' } }}
                    name="selectedDate"
                    format="DD/MM/YYYY"
                    views={['day', 'month', 'year']}
                    onError={(newError) => setErrorMessage(newError)}
                    disablePast

                    onAccept={(e) => { updateAppointmentDetails(e, 'selectedDate') }}
                  />
                </div>

                <div className="relative md:w-2/5 w-full h-10 mx-auto">
                  <TimePicker
                    disabled={appointDetails.selectedServices.length === 0 || appointDetails.selectedDate === null}
                    value={appointDetails.selectedTime ? dayjs(appointDetails.selectedTime) : null}
                    label="Select Service Time"
                    skipDisabled
                    shouldDisableTime={shouldDisableTime}
                    slotProps={{ textField: { size: 'small' } }}
                    name="selectedTime"
                    onError={(newError) => setErrorMessage(newError)}
                    minutesStep={15}
                    ampm={false}
                    onAccept={(e) => { updateAppointmentDetails(e, 'selectedTime') }}
                  />
                </div>
              </>
            ) :
              <>
                <div className="relative md:w-2/5 w-full h-10 mx-auto">
                  <MobileDatePicker
                    disabled={appointDetails.selectedServices.length === 0}
                    value={appointDetails.selectedDate ? dayjs(appointDetails.selectedDate) : null}
                    label="Select Service Date"
                    slotProps={{ textField: { size: 'small' } }}
                    name="selectedDate"
                    format="DD/MM/YYYY"
                    views={['day', 'month', 'year']}
                    onError={(newError) => setErrorMessage(newError)}
                    disablePast
                    onAccept={(e) => { updateAppointmentDetails(e, 'selectedDate') }}
                    className="w-full"
                  />
                </div>

                <div className="relative md:w-2/5 w-full h-10 mx-auto">
                  <MobileTimePicker
                    disabled={appointDetails.selectedServices.length === 0 || appointDetails.selectedDate === null}
                    value={appointDetails.selectedTime ? dayjs(appointDetails.selectedTime) : null}
                    label="Select Service Time"
                    skipDisabled
                    shouldDisableTime={shouldDisableTime}
                    slotProps={{ textField: { size: 'small' } }}
                    name="selectedTime"
                    onError={(newError) => setErrorMessage(newError)}
                    minutesStep={15}
                    ampm={false}
                    onAccept={(e) => { updateAppointmentDetails(e, 'selectedTime') }}
                    className="w-full"

                  />
                </div>
              </>
            }
            <Dropdown
              disabled={appointDetails.selectedServices.length === 0 || appointDetails.selectedDate === null || appointDetails.selectedTime === null}
              isSelected={appointDetails.selectedSpecialist}
              label='Select a Specialist'
              name='selectedSpecialist'
              handleOnChange={updateAppointmentDetails}
              options={[
                { label: '', value: '' },
                ...(specialists && specialists.map((specialist) => ({
                  value: specialist.staffId,
                  label: specialist.staffName,
                })))
              ]} />

          </>
          : <></>
        }

        <div className="relative w-full h-10 mx-auto">
          <button
            disabled={loading}
            class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-4 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
            type="submit">
            Book Now
          </button>
        </div>
        {/* {services && services.map((value) => {
          return (
            <div>{value.serviceName}</div>
          )
        })} */}

      </form>
    </div >
  );
}