import { useContext, useState } from "react";
import { fetchAllPriceOptions, savePriceOptions, fetchAllPricingRules, fetchAllSalonServices, fetchAllAgeCategories, fetchMatchSpecialists, createNewPriceRule, editPriceRule, deletePricingRule, } from '../services/salonConfiguration';
import { AuthContext } from "../context/AuthContext";
import { PriceContext } from "../context/PriceContext";
import { useNavigate } from "react-router-dom";

export const usePriceConfiguration = () => {

    const navigate = useNavigate();

    const { role } = useContext(AuthContext);
    const { priceOptions, performedChangesPriceOptions, setAllPriceOptions, setPriceOptions, setSuccessMessage, tableData, setTableData, allPricingRulesData, pricingRuleDetails, setPricingRuleDetails, setAllPricingRulesData, setAllServices, setPriceOptionsForPriceRule, ageCategories, setAgeCategories, specialists, setSpecialists, performedChangesPriceRule, } = useContext(PriceContext);

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
            setLoading(true);
            if (Array.isArray(priceOptions) && priceOptions.length === 0) {
                throw new Error('Please Select At Least One Price Option');
            }
            const response = await savePriceOptions(priceOptions);
            setSuccessMessage(`Successfully Saved Price Options`);
            performedChangesPriceOptions();
            // navigate(role === 'admin' ? '/admin/price-configurations' : '/staff/price-configurations', { state: { successMessage: `Successfully Saved Price Options` } })
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    //Pricing Rules
    const updatePricingRuleDetails = (e) => {
        setError(null);
        if (e.hasOwnProperty('target')) {
            const { name, value } = e.target;

            setPricingRuleDetails({
                ...pricingRuleDetails,
                [name]: value,
            });
        }
    };

    const updatePricingRuleDetailsObjectVer = (priceRule) => {
        setPricingRuleDetails({
            pricingRuleId: priceRule.pricingRuleId,
            serviceCode: priceRule.serviceCode,
            priceOptionType: priceRule.priceOptionCode,
            priceOptionValue: priceRule.priceRuleOptionValue,
            priceAdjustment: priceRule.priceAdjustment,
        });
    };

    const clearPricingRuleDetails = () => {

        setPricingRuleDetails({
            pricingRuleId: null,
            serviceCode: null,
            priceOptionType: null,
            priceOptionValue: null,
            priceAdjustment: null,
        });
    };

    const resetPricingForChangingService = () => {
        setPricingRuleDetails({
            ...pricingRuleDetails,
            priceOptionType: null,
            priceOptionValue: null,
            priceAdjustment: null,
        });
    };

    const resetPricingForChangingPriceOptionType = () => {
        setPricingRuleDetails({
            ...pricingRuleDetails,
            priceOptionValue: null,
            priceAdjustment: null,
        });
    };

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

    const handleSubmitForPricingRuleCreation = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await createNewPriceRule(pricingRuleDetails);
            setSuccessMessage(`Successfully Created New Pricing Rule`);
            clearPricingRuleDetails();

            navigate(role === 'admin' ? '/admin/price-configurations' : '/staff/price-configurations')
            performedChangesPriceRule();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmitForEditPricingRule = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await editPriceRule(pricingRuleDetails);
            setSuccessMessage(`Successfully Edited Pricing Rule, Pricing Rule ID : ${pricingRuleDetails.pricingRuleId}`);
            clearPricingRuleDetails();

            navigate(role === 'admin' ? '/admin/price-configurations' : '/staff/price-configurations');
            performedChangesPriceRule();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (pricingRuleDetails) => {
        clearPricingRuleDetails();

        //find the id and get the object from allPricingRulesData;
        const details = allPricingRulesData.find(value => value.pricingRuleId === pricingRuleDetails[0]);

        // if (details === undefined) {
        //     setError('Pricing Rule ID Not Found');
        // }

        updatePricingRuleDetailsObjectVer(details);

        navigate(role === 'admin' ? '/admin/price-configurations/modify' : '/staff/price-configurations/modify');

    }

    const handleDelete = async (pricingRuleId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this service?');

        if (isConfirmed) {
            //rmb to change the performing state for all delete modify and create, to fetch the services again
            try {
                const response = await deletePricingRule(pricingRuleId);
                setSuccessMessage(`Successfully Deleted Pricing Rule, ID: ${pricingRuleId}`);
                navigate(role === 'admin' ? '/admin/price-configurations' : '/staff/price-configurations');
                performedChangesPriceRule();
            } catch (error) {
                setError(error.message);
            } 
        }
    }


    return { loading, error, updatePriceOptions, fetchPriceOptions, handleSubmitForPriceOptions, handleEdit, handleDelete, fetchPricingRules, fetchServices, fetchPriceOptionsForPriceRuleCreation, fetchAgeCategories, fetchSpecialistsMatch, clearPricingRuleDetails, resetPricingForChangingService, resetPricingForChangingPriceOptionType, updatePricingRuleDetails, handleSubmitForPricingRuleCreation, handleSubmitForEditPricingRule, };
}