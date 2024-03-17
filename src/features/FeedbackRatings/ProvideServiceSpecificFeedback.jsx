import { useEffect } from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
import RadioButton from '../../components/RadioButton/RadioButton';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const { useServiceSpecificFeedback } = require('../../hooks/useServiceSpecificFeedback');

export default function ProvideServiceSpecificFeedback() {

  const { loading, error, successMessage, setSuccessMessage, serviceSpecificFeedbackDetails, appointmentHistory, updateServiceSpecificFeedbackDetails, resetRatingsDetailsWhenAppointmentIDChanged, handleSubmitForServiceSpecificFeedback, fetchAppointmentHistoryForFeedback, overallServiceRatingScale, cleaninessRatingScale, serviceSatisfactionRatingScale, communicationRatingScale, category, } = useServiceSpecificFeedback();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAppointmentHistoryForFeedback();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();

  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAppointmentHistoryForFeedback();
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
    resetRatingsDetailsWhenAppointmentIDChanged();

  }, [serviceSpecificFeedbackDetails.appointmentId])


  return (
    <div>
      <form className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12" onSubmit={(e) => handleSubmitForServiceSpecificFeedback(e)}>
        <div className="relative w-full">
          <div className="flex justify-center items-center mb-4 h-16">
            <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">Service Specific Feedback</span>
          </div>
        </div>

        {successMessage && (
          <div class="flex w-4/5 mx-auto items-center p-4 lg:mt-10 text-xl 2xl:text-2xl text-white rounded-lg bg-green-800" role="alert">
            <InformationCircleIcon className="h-6 w-6" />
            <span class="sr-only">Info</span>
            <div>
              <span className="pl-2">{successMessage}</span>
            </div>
          </div>
        )}

        {error && (
          <div class="w-4/5 text-center bg-red-100 border border-red-400 text-red-700 mx-auto px-5 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
          </div>
        )}

        <Dropdown
          isSelected={serviceSpecificFeedbackDetails.appointmentId}
          label='Appointment ID'
          name='appointmentId'
          handleOnChange={updateServiceSpecificFeedbackDetails}
          options={[
            { label: '', value: '' },
            ...(Array.isArray(appointmentHistory) && appointmentHistory.map((appointment) => ({
              value: appointment.appointmentId,
              label: `${appointment.appointmentId} ${appointment.appointmentDate}`,
            })))
          ]}

        />

        <RadioButton
          bookingMethod={serviceSpecificFeedbackDetails.overallServiceRating}
          name='overallServiceRating'
          label='Overall Service Rating'
          handleOnChange={updateServiceSpecificFeedbackDetails}
          type='scale'
          options={overallServiceRatingScale}
        />

        <div className="relative w-full mt-8">
          <div className="flex justify-center items-center mb-4 h-16">
            <span className="text-xl text-gray-900 px-3">Please Rate the Following Aspects of the Service</span>
          </div>

          <RadioButton
            bookingMethod={serviceSpecificFeedbackDetails.cleaninessRating}
            name='cleaninessRating'
            label='1. Cleanliness'
            handleOnChange={updateServiceSpecificFeedbackDetails}
            type='scale'
            options={cleaninessRatingScale}
          />
          <br />
          <RadioButton
            bookingMethod={serviceSpecificFeedbackDetails.serviceSatisfactionRating}
            name='serviceSatisfactionRating'
            label='2. Satisfaction with the Result'
            handleOnChange={updateServiceSpecificFeedbackDetails}
            type='scale'
            options={serviceSatisfactionRatingScale}
          />
          <br />
          <RadioButton
            bookingMethod={serviceSpecificFeedbackDetails.communicationRating}
            name='communicationRating'
            label='3. Communication'
            handleOnChange={updateServiceSpecificFeedbackDetails}
            type='scale'
            options={communicationRatingScale}
          />
        </div>



        <RadioButton
          bookingMethod={serviceSpecificFeedbackDetails.feedbackCategory}
          name='feedbackCategory'
          label='Please Select a Category that Best Represents Your Feedback'
          handleOnChange={updateServiceSpecificFeedbackDetails}
          type='category'
          options={category}
        />

        <div className="relative md:w-3/5 w-full h-auto mx-auto">
          <textarea
            name="feedbackComments"
            value={serviceSpecificFeedbackDetails.feedbackComments !== null ? serviceSpecificFeedbackDetails.feedbackComments : ''}
            className="peer w-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900 resize-none" // Added 'resize-none' to disable textarea resizing
            placeholder=""
            onChange={(e) => updateServiceSpecificFeedbackDetails(e)}
            pattern="^[\s\S]{1,255}$"
            title="Please leave your comments up to 255 characters long."
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Comments
          </label>
        </div>

        <div className="relative w-full h-12 2xl:h-14 mx-auto">
          <button
            disabled={loading}
            class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
            type="submit">
            Submit
          </button>
        </div>

      </form>
    </div >
  );
}