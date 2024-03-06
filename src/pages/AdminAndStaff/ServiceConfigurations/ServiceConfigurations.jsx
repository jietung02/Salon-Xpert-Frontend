import ServiceConfigurationMain from "../../../features/SalonService/ServiceConfigurationMain";
import { ServiceContextProvider } from "../../../context/ServiceContext";

export default function ServiceConfigurations() {
    return (
        <ServiceContextProvider>
            <ServiceConfigurationMain />
        </ServiceContextProvider>
    );
}
