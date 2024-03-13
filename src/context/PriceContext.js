import { createContext, useState } from "react";

export const PriceContext = createContext();

export const PriceContextProvider = ({ children }) => {

    const [successMessage, setSuccessMessage] = useState(null);

    //Price Options
    const [showPriceOptions, setShowPriceOptions] = useState(false);
    const [priceOptionChanged, setPriceOptionChanged] = useState(false);
    const [priceOptions, setPriceOptions] = useState([]);
    const [allPriceOptions, setAllPriceOptions] = useState([]);

    const performedChangesPriceOptions = () => {
        setPriceOptionChanged(!priceOptionChanged);
    }

    //Price Rules
    const [pricingRuleDetails, setPricingRuleDetails] = useState({
        pricingRuleId: null,
        serviceCode: null,
        priceOptionType: null,
        priceOptionValue: null,
        priceAdjustment: null,
    })

    const [tableData, setTableData] = useState({
        headers: [],
        pricingRulesData: [],
    });

    const [allPricingRulesData, setAllPricingRulesData] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [priceOptionsForPriceRule, setPriceOptionsForPriceRule] = useState([]);
    const [ageCategories, setAgeCategories] = useState([]);
    const [specialists, setSpecialists] = useState([]);
    const [priceRuleChanged, setPriceRuleChanged] = useState(false);
    

    const performedChangesPriceRule = () => {
        setPriceRuleChanged(!priceRuleChanged);
    };

    return (
        <PriceContext.Provider value={{ showPriceOptions, priceOptions, allPriceOptions, setPriceOptions, priceOptionChanged, successMessage, setShowPriceOptions, setAllPriceOptions, setSuccessMessage, performedChangesPriceOptions, pricingRuleDetails, setPricingRuleDetails, tableData, setTableData, allPricingRulesData, setAllPricingRulesData, allServices, setAllServices, priceOptionsForPriceRule, setPriceOptionsForPriceRule, ageCategories, setAgeCategories, specialists, setSpecialists, priceRuleChanged, performedChangesPriceRule, }}>
            {children}
        </PriceContext.Provider>
    )
}