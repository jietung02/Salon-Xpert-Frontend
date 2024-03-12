import PriceConfigurationMain from "../../../features/SalonPrice/PriceConfigurationMain";
import { PriceContextProvider } from "../../../context/PriceContext";

export default function PriceConfigurations() {
    return (
        <PriceContextProvider >
            <PriceConfigurationMain />
        </PriceContextProvider>
    );
}