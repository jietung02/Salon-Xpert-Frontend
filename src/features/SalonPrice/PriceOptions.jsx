import { useContext, useEffect, useState } from "react"
import { usePriceConfiguration } from "../../hooks/usePriceConfiguration"
import { AuthContext } from "../../context/AuthContext";
import { PriceContext } from "../../context/PriceContext";

import Checkbox from "../../components/Checkbox/Checkbox";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function PriceOptions() {

  const { role } = useContext(AuthContext);
  const { priceOptions, showPriceOptions, setPriceOptions, allPriceOptions, setShowPriceOptions, } = useContext(PriceContext);
  const { loading, error, updatePriceOptions, handleSubmitForPriceOptions, } = usePriceConfiguration();


  return (
    <>

      <div>
        <form className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12" onSubmit={(e) => handleSubmitForPriceOptions(e)}>
          <div className="relative w-full">
            <div className="flex justify-center items-center mb-4 h-16">
              <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">Price Options</span>
            </div>
            <button
              className="absolute top-0 right-0 mt-1 mr-1 md:mr-4"
              onClick={() => {
                setPriceOptions([]);
                setShowPriceOptions(false);
              }}
            >
              <XMarkIcon className="h-6 w-6 hover:text-gray-500" color="#111827" />
            </button>
          </div>

          {error && (
            <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
              <span class="block sm:inline text-xs">{error}</span>
            </div>
          )}

          <Checkbox
            label='Price Options'
            checkBoxGroupName='priceOptions'
            selectedServices={Array.isArray(priceOptions) && priceOptions}
            handleOnChange={updatePriceOptions}
            options={(Array.isArray(allPriceOptions) && allPriceOptions.map((option) => {

              return {
                uniqueId: option.priceOptionCode,
                value: option.priceOptionName,
              }
            }))} />

          <div className="relative w-full h-12 2xl:h-14 mx-auto">
            <button
              disabled={loading}
              class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-4 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
              type="submit">
              Save
            </button>
          </div>

        </form>
      </div >
      <div></div>
    </>
  );
}