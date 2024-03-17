import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { PriceContext } from "../../context/PriceContext";
import { usePriceConfiguration } from "../../hooks/usePriceConfiguration";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Dropdown from "../../components/Dropdown/Dropdown";

export default function ModifyPricingRule() {
  const { role } = useContext(AuthContext);
  const { pricingRuleDetails, allServices, priceOptionsForPriceRule, ageCategories, specialists } = useContext(PriceContext);
  const { loading, error, updatePricingRuleDetails, fetchServices, fetchPriceOptionsForPriceRuleCreation, fetchAgeCategories, handleSubmitForEditPricingRule, fetchSpecialistsMatch, } = usePriceConfiguration();

  useEffect(() => {

    const fetchData = async () => {
      try {
        await fetchServices();
        await fetchPriceOptionsForPriceRuleCreation();
        await fetchAgeCategories();
        await fetchSpecialistsMatch();
      } catch (error) {
        console.error('Error fetching services', error);
      }
    }
    fetchData();

  }, []);


  return (
    <div>
      <form className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12" onSubmit={(e) => handleSubmitForEditPricingRule(e)}>
        <div className="relative w-full">
          <div className="flex justify-center items-center mb-4 h-16">
            <span className="font-bold text-xl text-gray-900">Edit Pricing Rule</span>
          </div>
          <div className="absolute top-0 right-0 mt-1 mr-1 md:mr-4">
            <Link to={role === 'admin' ? '/admin/price-configurations' : '/staff/price-configurations'} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-6 w-6 hover:text-gray-500" color="#111827" />
            </Link>
          </div>
        </div>

        {error && (
          <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xs">{error}</span>
          </div>
        )}


        <Dropdown
          disabled={true}
          isSelected={pricingRuleDetails.serviceCode}
          label='Service Name'
          name='serviceCode'
          options={[
            { label: '', value: '' },
            ...(Array.isArray(allServices) && allServices.map((service) => ({
              value: service.serviceCode,
              label: service.serviceName,
            })))
          ]} />

        <Dropdown
          disabled={true}
          isSelected={pricingRuleDetails.priceOptionType}
          label='Price Option Name'
          name='priceOptionType'
          options={[
            { label: '', value: '' },
            ...(Array.isArray(priceOptionsForPriceRule) && priceOptionsForPriceRule.map((option) => ({
              value: option.priceOptionCode,
              label: option.priceOptionName,
            })))
          ]} />

        <Dropdown
          disabled={true}
          isSelected={pricingRuleDetails.priceOptionValue}
          label={pricingRuleDetails.priceOptionType === 'AGE' ? 'Select an Age Range' : pricingRuleDetails.priceOptionType === 'SPECIALIST' ? 'Select a Specialist' : 'Select a Gender'}
          name='priceOptionValue'
          options={[
            { label: '', value: '' },
            ...(pricingRuleDetails.priceOptionType === 'AGE' && Array.isArray(ageCategories) ? ageCategories.map((category) => ({
              value: category.ageRange,
              label: `${category.categoryName} ${category.ageRange}`,
            })) : []),
            ...(pricingRuleDetails.priceOptionType === 'SPECIALIST' && Array.isArray(specialists) ? specialists.map((specialist) => ({
              value: specialist.staffId,
              label: specialist.staffName,
            })) : []),
            ...(pricingRuleDetails.priceOptionType === 'GENDER' ? [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] : [])
          ]} />



        <div className="relative md:w-2/5 w-full h-12 2xl:h-14 mx-auto">
          <input
            type="number"
            step="any"
            name="priceAdjustment"
            value={pricingRuleDetails.priceAdjustment !== null ? pricingRuleDetails.priceAdjustment : ''}
            className="peer w-full h-full bg-transparent text-gray-900 font-normal outline outline-0 focus:outline-0 disabled:bg-white disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2 border-t-transparent focus:border-t-transparent text-xl 2xl:text-2xl px-3 py-2.5 rounded-[7px] border-gray-100 focus:border-gray-900"
            placeholder=""
            onChange={(e) => updatePricingRuleDetails(e)}
            min="0.00"
            max="50000.00"
            required
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-xs peer-focus:text-xs before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-100 peer-focus:before:!border-gray-900 after:border-gray-100 peer-focus:after:!border-gray-900"
          >
            Price Adjustment
          </label>
        </div>

        <div className="relative w-full h-12 2xl:h-14 mx-auto">
          <button
            disabled={loading}
            class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
            type="submit">
            Update
          </button>
        </div>

      </form>
    </div >
  );
}