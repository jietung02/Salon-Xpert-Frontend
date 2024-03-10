import ManageRolesMain from "../../../features/Role/ManageRolesMain";
import { RoleContextProvider } from "../../../context/RoleContext";

export default function Roles() {
  return (
    <RoleContextProvider >
      <ManageRolesMain />
    </RoleContextProvider>
  );
}