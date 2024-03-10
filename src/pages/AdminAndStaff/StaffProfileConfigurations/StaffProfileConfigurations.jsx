import StaffProfileConfigurationMain from "../../../features/SalonStaffProfile/StaffProfileConfigurationMain";
import { StaffProfileContextProvider } from "../../../context/StaffProfileContext";

export default function StaffProfileConfigurations() {
    return (
        <StaffProfileContextProvider >
            <StaffProfileConfigurationMain />
        </StaffProfileContextProvider>
    );
}