import { useContext, useState } from "react";
import { fetchAllPriceOptions, savePriceOptions, fetchAllPricingRules, fetchAllSalonServices, fetchAllAgeCategories, fetchMatchSpecialists, } from '../services/salonConfiguration';
import { AuthContext } from "../context/AuthContext";
import { PriceContext } from "../context/PriceContext";
import { useNavigate } from "react-router-dom";

export const usePriceConfiguration = () => {

    const navigate = useNavigate();

    const { role } = useContext(AuthContext);
    const { priceOptions, performedChangesPriceOptions, setAllPriceOptions, setPriceOptions, setSuccessMessage, tableData, setTableData, allPricingRulesData, pricingRuleDetails, setPricingRuleDetails, setAllPricingRulesData, setAllServices, setPriceOptionsForPriceRule, ageCategories, setAgeCategories, specialists, setSpecialists, } = useContext(PriceContext);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    //Pricing Options
    const updatePriceOptions = (e) => {
        setError(null);
        if (e.hasOwnProperty('target')) {
            const { name, value, type, checked } = e.target;

            setPriceOptions((prevDetails) => {
                if (type === 'checkbox') {
                    if (checked) {
                        if (prevDetails.includes(value)) {
                            return prevDetails;
                        } else {
                            return [...prevDetails, value];
                        }
                    } else {
                        if (prevDetails.includes(value)) {
                            return prevDetails.filter(item => item !== value);
                        } else {
                            return prevDetails;
                        }
                    }
                }
                return prevDetails;
            });
        }
    }

    const fetchPriceOptions = async () => {
        try {
            const priceOptions = await fetchAllPriceOptions();
            const activePriceOptions = priceOptions.data.filter(option => option.priceOptionIsActive === 1).map(option => option.priceOptionCode);

            setPriceOptions(activePriceOptions);
            setAllPriceOptions(priceOptions.data);

        } catch (error) {
            setError(error.message);
        }
    }

    const handleSubmitForPriceOptions = async (e) => {
        e.preventDefault();
        try {
            if (Array.isArray(priceOptions) && priceOptions.length === 0) {
                throw new Error('Please Select At Least One Price Option');
            }
            const response = await savePriceOptions(priceOptions);

            // navigate(role === 'admin' ? '/admin/price-configurations' : '/staff/price-configurations', { state: { successMessage: `Successfully Saved Price Options` } })
        } catch (error) {
            setError(error.message)
        } finally {
            setSuccessMessage(`Successfully Saved Price Options`);
            performedChangesPriceOptions();
        }
    }

    //Pricing Rules
    const updatePricingRuleDetails = (e) => {
        if (e.hasOwnProperty('target')) {
            const { name, value } = e.target;

            setPricingRuleDetails({
                ...pricingRuleDetails,
                [name]: value,
            });
        }
    }

    const resetPricingForChangingService = () => {
        setPricingRuleDetails({
            ...pricingRuleDetails,
            priceOptionType: null,
            priceOptionValue: null,
            priceAdjustment: null,
        });
    }

    const resetPricingForChangingPriceOptionType = () => {
        setPricingRuleDetails({
            ...pricingRuleDetails,
            priceOptionValue: null,
            priceAdjustment: null,
        });
    }

    const fetchPricingRules = async () => {
        try {
            const priceRules = await fetchAllPricingRules();
            setTableData({
                headers: priceRules.data.headers,
                pricingRulesData: priceRules.data.pricingRulesData,
            });
            setAllPricingRulesData(priceRules.data.additionalData);


        } catch (error) {
            setError(error.message);
        }
    }

    const fetchPriceOptionsForPriceRuleCreation = async () => {
        try {
            const priceOptions = await fetchAllPriceOptions();
            const activePriceOptions = priceOptions.data.filter(option => option.priceOptionIsActive === 1).map(option => {
                return {
                    priceOptionCode: option.priceOptionCode,
                    priceOptionName: option.priceOptionName,
                }
            });

            setPriceOptionsForPriceRule(activePriceOptions);

        } catch (error) {
            setError(error.message);
        }
    }

    const fetchServices = async () => {
        try {
            const services = await fetchAllSalonServices();
            setAllServices(services.data);


        } catch (error) {
            setError(error.message);
        }
    }

    const fetchAgeCategories = async () => {
        try {
            const ranges = await fetchAllAgeCategories();
            setAgeCategories(ranges.data);


        } catch (error) {
            setError(error.message);
        }
    }

    const fetchSpecialistsMatch = async () => {
        try {
            const specialists = await fetchMatchSpecialists(pricingRuleDetails.serviceCode);
            setSpecialists(specialists.data);

        } catch (error) {
            setError(error.message);
        }
    }

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }

    return { loading, error, updatePriceOptions, fetchPriceOptions, handleSubmitForPriceOptions, handleEdit, handleDelete, fetchPricingRules, fetchServices, fetchPriceOptionsForPriceRuleCreation, fetchAgeCategories, fetchSpecialistsMatch, resetPricingForChangingService, resetPricingForChangingPriceOptionType, updatePricingRuleDetails, };
}