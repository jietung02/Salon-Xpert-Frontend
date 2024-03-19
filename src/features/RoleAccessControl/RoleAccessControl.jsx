import { useAccessControl } from "../../hooks/useAccessControl";
import Dropdown from "../../components/Dropdown/Dropdown";
import Checkbox from "../../components/Checkbox/Checkbox";
import { useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";


export default function RoleAccessControl() {

  const { rolePermissions, permissionCategories, roles, loading, successMessage, error, setSuccessMessage, performingChanges, resetRolePermissions, updateRolePermissions, fetchRoles, fetchPermissions, fetchRolePermissions, handleSubmit } = useAccessControl();


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRoles();
        await fetchPermissions();

        //fetch the permission category here
      } catch (error) {
        console.error('Error fetching roles', error);
      }

    }
    fetchData();
  }, []);

  useEffect(() => {

    const fetchData = async () => {
      try {
        await fetchRolePermissions();

      } catch (error) {
        console.error('Error fetching roles', error);
      }
    }
    if (rolePermissions.roleCode === null || rolePermissions.roleCode === '') {
      resetRolePermissions();
    }
    else {
      fetchData();
    }

  }, [rolePermissions.roleCode]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);


    return () => clearTimeout(timer);

  }, [performingChanges]);

  return (
    <div>
      <h1 className="px-8 py-6 text-3xl sm:px-7 md:px-11 md:py-6 md:text-4xl lg:px-11 md:text-left text-center font-bold text-gray-900">Access Control</h1>
      {successMessage && (
        <div class="flex w-3/5 mx-auto items-center p-4 lg:mt-10 text-xl 2xl:text-2xl text-white rounded-lg bg-green-800" role="alert">
          <InformationCircleIcon className="h-6 w-6" />
          <span class="sr-only">Info</span>
          <div>
            <span className="pl-2">{successMessage}</span>
          </div>
        </div>
      )}
      <form className="my-4 mx-auto w-4/5 bg-gray-50 rounded-lg shadow-md shadow-gray-300 flex flex-wrap md:items-end gap-8 px-12 lg:px-20 2xl:px-24 py-12" onSubmit={(e) => handleSubmit(e)}>
        <div className="relative w-full">
          <div className="flex justify-center items-center mb-4 h-16">
            <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl text-gray-900">Role-Based Access Control</span>
          </div>
        </div>

        {error && (
          <div class="w-full text-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
          </div>
        )}
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
          ]}
          goTop='Yes'
        />

        <Checkbox
          disabled={rolePermissions.roleCode === null || rolePermissions.roleCode === ''}
          label='Permission Categories'
          checkBoxGroupName='permissions'
          selectedServices={Array.isArray(rolePermissions.permissions) && rolePermissions.permissions}
          // selectedServices={rolePermissions.roleCode !== null && existingRolePermissions.find(value => value.roleCode === rolePermissions.roleCode)?.permissionCategories}
          handleOnChange={updateRolePermissions}
          options={(Array.isArray(permissionCategories) && permissionCategories.map((category) => {

            return {
              uniqueId: category.category,
              value: category.category,
            }
          }))} />

        <div className="relative w-full h-12 2xl:h-14 mx-auto">
          <button
            disabled={loading}
            class="align-middle select-none font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xl 2xl:text-2xl py-2 px-5 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-900 active:opacity-[0.85] flex mx-auto items-center gap-3"
            type="submit">
            Save
          </button>
        </div>

      </form>
    </div >
  );
}