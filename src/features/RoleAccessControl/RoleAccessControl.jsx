import { useAccessControl } from "../../hooks/useAccessControl";
import Dropdown from "../../components/Dropdown/Dropdown";
import Checkbox from "../../components/Checkbox/Checkbox";
import { useEffect } from "react";

export default function RoleAccessControl() {

  const { rolePermissions, permissionCategories, roles, loading, error, updateRolePermissions, fetchRoles, handleSubmit, } = useAccessControl();


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRoles();
        //fetch the permission category here
      } catch (error) {
        console.error('Error fetching roles', error);
      }

    }
    fetchData();
  }, []);

  useEffect(()=> {
    //reset the role selected permission 
  },rolePermissions.roleCode)

  return (
    <div>
      <h1 className="px-8 py-6 text-3xl sm:px-7 md:px-11 md:py-6 md:text-4xl lg:px-11 md:text-left text-center font-bold text-gray-900">Access Control</h1>

      <form className="my-4 container mx-auto w-5/6 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 py-12 mx-auto" onSubmit={(e) => handleSubmit(e)}>
        <div className="relative w-full">
          <div className="flex justify-center items-center mb-4 h-16">
            <span className="font-bold text-xl text-gray-900">Role-Based Access Control</span>
          </div>
        </div>
        <Dropdown
          isSelected={rolePermissions.roleCode}
          label='Select a Role'
          name='roleCode'
          handleOnChange={updateRolePermissions}
          options={[
            { label: '', value: '' },
            ...(roles && roles.map((role) => ({
              value: role.roleCode,
              label: role.roleName,
            })))
          ]} />


        <div className="relative w-full h-10 mx-auto">
          <button
            disabled={loading}
            class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-4 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
            type="submit">
            Create
          </button>
        </div>

      </form>
    </div >
  );
}