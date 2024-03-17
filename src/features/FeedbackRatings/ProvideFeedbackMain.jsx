import { useContext, useEffect } from "react";
import { FeedbackContext } from "../../context/FeedbackContext";
import RadioButton from "../../components/RadioButton/RadioButton";
import ProvideServiceSpecificFeedback from "./ProvideServiceSpecificFeedback";
import ProvideGeneralFeedback from "./ProvideGeneralFeedback";

export default function ProvideFeedbackMain() {

  const { selectedFeedbackType, setSelectedFeedbackType } = useContext(FeedbackContext);

  const updateSelectedFeedbackType = (e) => {
    setSelectedFeedbackType(e.target.value);
  }

  return (
    <div>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Feedback & Ratings</h1>

      <div className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-200 flex flex-wrap md:items-end gap-8 px-10 py-10">
        <RadioButton
          bookingMethod={selectedFeedbackType}
          name='feedbackType'
          label='Feedback Type'
          handleOnChange={updateSelectedFeedbackType}

          options={[{ id: 'serviceSpecificFeedback', value: 'serviceSpecificFeedback', label: 'Service Specific' }, { id: 'generalFeedback', value: 'generalFeedback', label: 'General' }]}
        />

      </div>

      {selectedFeedbackType === 'serviceSpecificFeedback' && <ProvideServiceSpecificFeedback />}
      {selectedFeedbackType === 'generalFeedback' && <ProvideGeneralFeedback />}

    </div>

  );
}