import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { PriceContext } from "../../context/PriceContext";
import PriceOptions from "./PriceOptions";
import { useContext, useEffect } from "react";
import { usePriceConfiguration } from "../../hooks/usePriceConfiguration";
import Table from "../../components/Table/Table";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function PriceConfigurationMain() {

  const { role } = useContext(AuthContext);
  const { showPriceOptions, successMessage, setShowPriceOptions, setSuccessMessage, priceOptionChanged, priceRuleChanged, tableData, } = useContext(PriceContext);

  const { fetchPriceOptions, error, fetchPricingRules, handleEdit, handleDelete } = usePriceConfiguration();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPricingRules();
      } catch (error) {
        console.error('Error fetching pricing rules', error);
      }
    }
    fetchData();

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPriceOptions();
      } catch (error) {
        console.error('Error fetching price options', error);
      }
    }
    if (showPriceOptions === true) {
      fetchData();
    }
  }, [showPriceOptions])

  useEffect(() => {

    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [priceOptionChanged])

  useEffect(() => {

    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
    
    const fetchData = async () => {
      try {
        await fetchPricingRules();
      } catch (error) {
        console.error('Error fetching pricing rules', error);
      }
    }
    fetchData();

    return () => clearTimeout(timer);
  }, [priceRuleChanged]);



  return (
    <div>
      <h1 className="px-8 py-6 text-4xl sm:px-7 lg:px-20 lg:py-10 2xl:px-20 2xl:py-12 2xl:text-5xl lg:text-left text-center font-bold text-gray-900">Prices Configuration</h1>

      {successMessage && (
        <div class="flex w-3/5 mx-auto items-center p-4 lg:mt-10 text-xl 2xl:text-2xl text-white rounded-lg bg-green-800" role="alert">
          <InformationCircleIcon className="h-6 w-6" />
          <span class="sr-only">Info</span>
          <div>
            <span className="pl-2">{successMessage}</span>
          </div>
        </div>
      )}
      {error && (
        <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
          <span class="block sm:inline text-xs">{error}</span>
        </div>
      )}

      <button
        class="mt-5 align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
        type="button"
        onClick={() => {
          setShowPriceOptions(true);
        }}
      >
        Configure Pricing Options
      </button>

      {showPriceOptions && <PriceOptions />}



      {tableData.headers.length > 0 && tableData.pricingRulesData.length > 0 ?
        <Table headers={tableData.headers} data={tableData.pricingRulesData} handleEdit={handleEdit} handleDelete={handleDelete} />
        :
        (
          <div className="relative overflow-auto shadow-md sm:rounded-lg md:m-16 m-3 h-80 flex items-center justify-center">
            <span className="text-red-500 text-lg">{error}</span>
          </div>
        )}

      <div className="relative w-full h-12 2xl:h-14 mx-auto">
        <Link
          to={role === 'admin' ? '/admin/price-configurations/create' : '/staff/price-configurations/create'}
          className="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 w-80 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
          role="button"
        >
          <span className="inline-block w-full">Add New Pricing Rule</span>
        </Link>
      </div>

      <Outlet />
    </div>

  );
}