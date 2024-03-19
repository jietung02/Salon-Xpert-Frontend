import { useReviewFeedback } from "../../hooks/useReviewFeedback";
import Dropdown from "../../components/Dropdown/Dropdown";
import RadioButton from "../../components/RadioButton/RadioButton";
import Checkbox from "../../components/Checkbox/Checkbox";
import { useEffect } from "react";
import Table from "../../components/Table/Table";

export default function ReviewFeedback() {

  const { loading, error, filterIsOpen, sortIsOpen, toggleFilterButton, toggleSortButton, filterDetails, sortDetails, updateFilterDetails, resetFilterDetails, updateSortDetails, overallServiceRatingScale, cleaninessRatingScale, serviceSatisfactionRatingScale, communicationRatingScale, fetchAllFeedback, tableData, handleFilterApply, resetFilteredDetails, resetSortedDetails, allServiceSpecificFeedback, allGeneralFeedback, filteredDetails, sortedDetails, resetSortDetails, handleSortApply,setOriginalDataToTable, } = useReviewFeedback();


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllFeedback();
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    resetFilteredDetails();
    resetSortedDetails();
    if (filterDetails.feedbackType !== undefined && filterDetails.feedbackType !== null && filterDetails.feedbackType !== '') {
      fetchData();
    }

  }, [filterDetails.feedbackType]);


  return (

    <div>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Review Feedback</h1>

      <div className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-200 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12">
        {error && (
          <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
          </div>
        )}

        <Dropdown
          isSelected={filterDetails.feedbackType}
          label='Feedback Type'
          name='feedbackType'
          handleOnChange={updateFilterDetails}
          options={[
            { label: '', value: '' },
            { label: 'Service Specific', value: 'service-specific' },
            { label: 'General', value: 'general' },
          ]
          }
          goTop='Yes'
        />
      </div>

      <button
        disabled={filterDetails.feedbackType === null || filterDetails.feedbackType === ''}
        class="mt-5 align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
        type="button"
        onClick={() => {
          toggleFilterButton();
        }}
      >
        Toggle Filter By:
      </button>
      {filterIsOpen && filterDetails.feedbackType && (
        <>

          <form className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12" onSubmit={(e) => { handleFilterApply(e) }}>
            <RadioButton
              bookingMethod={filterDetails.feedbackCategory}
              name='feedbackCategory'
              label='Please Select a Category that Best Represents Your Feedback'
              handleOnChange={updateFilterDetails}
              options={[
                { id: 'Praise', value: 'Praise', label: 'Praise and Positive Feedback' },
                { id: 'Improvement', value: 'Improvement', label: 'Suggestions for Improvement' },
                { id: 'Complaint', value: 'Complaint', label: 'Complaints and Concerns' },
              ]}
              type='category'
            />
            <Dropdown
              isSelected={filterDetails.gender}
              label='Gender (optional)'
              name='gender'
              handleOnChange={updateFilterDetails}
              options={[{ label: '', value: '' }, { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
              goTop='Yes'
              optional={true}
            />

            <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
              <input
                type="text"
                name="age"
                value={filterDetails.age !== null ? filterDetails.age : ''}
                className="peer w-full h-full bg-transparent text-gray-900  font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
                placeholder=""
                onChange={(e) => updateFilterDetails(e)}
                pattern="^\d{1,2}-\d{1,2}$"
                title="Please enter a number range in the format 'XX-YY', where XX and YY are numbers between 0 and 99."
              />
              <label
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
              >
                Age Range (15-20)
              </label>

            </div>

            {filterDetails.feedbackType && filterDetails.feedbackType === 'service-specific' && (
              <>
                <RadioButton
                  bookingMethod={filterDetails.overallRating}
                  name='overallRating'
                  label='Overall Service Rating'
                  handleOnChange={updateFilterDetails}
                  type='scale'
                  options={overallServiceRatingScale}
                />

                <RadioButton
                  bookingMethod={filterDetails.cleanlinessRating}
                  name='cleanlinessRating'
                  label='Cleanliness Rating'
                  handleOnChange={updateFilterDetails}
                  type='scale'
                  options={cleaninessRatingScale}
                />

                <RadioButton
                  bookingMethod={filterDetails.satisfactionWithResultRating}
                  name='satisfactionWithResultRating'
                  label='Satisfaction Rating'
                  handleOnChange={updateFilterDetails}
                  type='scale'
                  options={serviceSatisfactionRatingScale}
                />

                <RadioButton
                  bookingMethod={filterDetails.communicationRating}
                  name='communicationRating'
                  label='Communication Rating'
                  handleOnChange={updateFilterDetails}
                  type='scale'
                  options={communicationRatingScale}
                />
              </>
            )}

            <button
              class="mt-5 align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
              type="button"
              onClick={() => {
                resetFilteredDetails();
                resetFilterDetails();
              }}
            >
              Reset All
            </button>
            <button
              class="mt-5 align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
              type="submit"
            >
              Apply
            </button>
          </form>


        </>
      )}


      <button
        disabled={filterDetails.feedbackType === null || filterDetails.feedbackType === ''}
        class="mt-5 align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
        type="button"
        onClick={() => {
          toggleSortButton();
        }}
      >
        Toggle Sort By:
      </button>
      {/* {sortIsOpen &&   (
        <>
          <div className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12">

          </div>
        </>
      )} */}

      {sortIsOpen && filterDetails.feedbackType && (
        <>

          <form className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12" onSubmit={(e) => { handleSortApply(e) }}>

            {filterDetails.feedbackType && filterDetails.feedbackType === 'service-specific' && (
              <>
                <RadioButton
                  bookingMethod={sortDetails.overallRating}
                  name='overallRating'
                  label='Overall Service Rating'
                  handleOnChange={updateSortDetails}

                  options={[
                    { id: 'ratingAsc', value: 'true', label: 'Lowest to Highest' },
                    { id: 'ratingDesc', value: 'false', label: 'Highest to Lowest' },
                  ]}
                />

              </>
            )}

            <RadioButton
              bookingMethod={sortDetails.date}
              name='date'
              label='Date'
              handleOnChange={updateSortDetails}

              options={[
                { id: 'dateAsc', value: 'true', label: 'Date Ascending' },
                { id: 'dateDesc', value: 'false', label: 'Date Descending' },
              ]}
            />

            <RadioButton
              bookingMethod={sortDetails.age}
              name='age'
              label='Age'
              handleOnChange={updateSortDetails}

              options={[
                { id: 'ageAsc', value: 'true', label: 'Age Ascending' },
                { id: 'ageDesc', value: 'false', label: 'Age Descending' },
              ]}
            />

            <button
              class="mt-5 align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
              type="button"
              onClick={() => {
                resetSortedDetails();
                resetSortDetails();
              }}
            >
              Reset All
            </button>
            <button
              class="mt-5 align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
              type="submit"
            >
              Apply
            </button>
          </form>


        </>
      )}

      {tableData.headers.length > 0 &&
        <Table headers={tableData.headers} data={tableData.feedbackDetails} />
      }

    </div>
  );
}