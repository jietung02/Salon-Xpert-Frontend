import { useGeneralFeedback } from "../../hooks/useGeneralFeedback";
import Dropdown from "../../components/Dropdown/Dropdown";
import RadioButton from "../../components/RadioButton/RadioButton";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ProvideGeneralFeedback() {

  const { isAuthenticated, name, email, gender, age } = useContext(AuthContext);
  const { loading, error, successMessage, setSuccessMessage, generalFeedbackDetails, setGeneralFeedbackDetails, updateGeneralFeedbackDetails, resetNameAndEmail, handleSubmitForGeneralFeedback, category } = useGeneralFeedback();

  useEffect(() => {

    if (successMessage !== null) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      if (isAuthenticated === true && name !== null && email !== null && gender !== null && age !== null) {
        setGeneralFeedbackDetails({
          ...generalFeedbackDetails,
          name,
          email,
          gender,
          age,
        })
      }
      return () => clearTimeout(timer);
    };

  }, [successMessage]);

  useEffect(() => {

    if (generalFeedbackDetails.isAnonymous === 'yes') {
      resetNameAndEmail();
    }
  }, [generalFeedbackDetails.isAnonymous]);

  useEffect(() => {
    if (isAuthenticated === true && name !== null && email !== null && gender !== null && age !== null) {
      setGeneralFeedbackDetails({
        ...generalFeedbackDetails,
        name,
        email,
        gender,
        age,
      })
    }
  }, []);

  return (
    <div>
      {isAuthenticated && isAuthenticated === 'guest' &&
        <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">General Feedback</h1>
      }
      <form className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12" onSubmit={(e) => handleSubmitForGeneralFeedback(e)}>

        <div className="relative w-full">
          <div className="flex justify-center items-center mb-4 h-16">
            <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">{isAuthenticated && isAuthenticated !== 'guest' ? 'General Feedback' : 'Provide General Feedback'}</span>
          </div>
        </div>

        {successMessage && (
          <div class="flex w-4/5 mx-auto items-center p-4 mb-5 text-xl 2xl:text-2xl text-white rounded-lg bg-green-800" role="alert">
            <InformationCircleIcon className="h-6 w-6" />
            <span class="sr-only">Info</span>
            <div>
              <span className="pl-2">{successMessage}</span>
            </div>
          </div>
        )}

        {error && (
          <div class="w-4/5 text-center bg-red-100 border border-red-400 text-red-700 mt-0 mx-auto px-5 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
          </div>
        )}

        <Dropdown
          disabled={gender !== null}
          isSelected={generalFeedbackDetails.gender}
          loadSelection={gender}
          label='Gender'
          name='gender'
          handleOnChange={updateGeneralFeedbackDetails}
          options={[{ label: '', value: '' }, { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}

        />


        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="number"
            readOnly={age !== null}
            name="age"
            value={age !== null ? age : generalFeedbackDetails.age !== null ? generalFeedbackDetails.age : ''}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updateGeneralFeedbackDetails(e)}
            min="0"
            max="100"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Age
          </label>

        </div>



        <RadioButton
          bookingMethod={generalFeedbackDetails.feedbackCategory}
          name='feedbackCategory'
          label='Please Select a Category that Best Represents Your Feedback'
          handleOnChange={updateGeneralFeedbackDetails}
          options={category}
          type='category'
        />

        <div className="relative md:w-3/5 w-full h-auto mx-auto">
          <textarea
            name="feedbackComments"
            value={generalFeedbackDetails.feedbackComments !== null ? generalFeedbackDetails.feedbackComments : ''}
            className="peer w-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900 resize-none" // Added 'resize-none' to disable textarea resizing
            placeholder=""
            onChange={(e) => updateGeneralFeedbackDetails(e)}
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

        {isAuthenticated === 'guest' && (
          <RadioButton
            bookingMethod={generalFeedbackDetails.isAnonymous}
            name='isAnonymous'
            label='Would You Like to Provide Feedback Anonymously?'
            handleOnChange={updateGeneralFeedbackDetails}
            options={[
              { id: 'yes', value: 'yes', label: 'Yes' },
              { id: 'no', value: 'no', label: 'No' },
            ]}
          />
        )}

        {isAuthenticated === 'guest' && generalFeedbackDetails.isAnonymous && generalFeedbackDetails.isAnonymous === 'no' && (
          <>
            <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto mt-3">
              <input
                type="text"
                name="name"
                value={generalFeedbackDetails.name !== null ? generalFeedbackDetails.name : ''}
                className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
                placeholder=""
                onChange={(e) => updateGeneralFeedbackDetails(e)}
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
                value={generalFeedbackDetails.email !== null ? generalFeedbackDetails.email : ''}
                className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
                placeholder=""
                onChange={(e) => updateGeneralFeedbackDetails(e)}
                required
              />
              <label
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
              >
                Email
              </label>
            </div>
          </>
        )}

        {/* <RadioButton
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



        

        <div className="relative  w-3/5 h-auto mx-auto">
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
        </div> */}

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