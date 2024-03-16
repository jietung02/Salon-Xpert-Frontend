import { useState, useContext, useEffect } from "react";

import {
  Bars3Icon,
} from "@heroicons/react/24/solid";

import { AuthContext } from "../context/AuthContext";
import useScreenSize from "../hooks/useScreenSize";
import SideBarMenuItem from "./SideBarMenuItem";

export default function SideBar() {

  const { permissions } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const { width, height } = useScreenSize();


  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = () => {
    if (width < 1024) {
      setOpen(false); // Close the dropdown if the screen size is less than 768
    }
  };

  useEffect(() => {
    if (width >= 1024) {
      setOpen(true);
    }
    else {
      setOpen(false);
    }

  }, [width]);


  return (
    <div
      className="flex flex-col w-full lg:w-1/5 text-white bg-gray-900 flex-shrink-0"
    >
      <div className="flex-shrink-0 px-8 py-8 flex flex-row items-center justify-between">
        <span
          className="text-2xl px-2 py-2 lg:text-2xl 2xl:text-3xl 2xl:px-4  font-semibold tracking-widest text-white uppercase rounded-lg"
        >
          Salon Xpert
        </span>
        <button
          className="rounded-lg lg:hidden rounded-lg focus:outline-none focus:shadow-outline"
          onClick={toggleDropdown}
        >
          <Bars3Icon className="h-8 w-8 stroke-2" />
        </button>
      </div>
      {open && (
        <nav className="flex-grow lg:block px-4 pb-4 lg:pb-0 lg:overflow-y-auto">
          {permissions.map((permission, index) => (
            <div key={index} className="m-2">
              <span className="block px-2 py-2 text-base lg:text-lg 2xl:text-xl 2xl:px-4  font-semibold text-gray-400">{permission.rolePermission}</span>
              {permission.functions.map((func, i) => (
                <SideBarMenuItem key={i} isSelected={false} name={func.name} path={func.route} onClick={handleMenuItemClick}/>
              ))}
            </div>
          ))}
          <SideBarMenuItem isSelected={false} name={'Log Out'} path={'/'} />
        </nav>
      )}
    </div >
  );
}