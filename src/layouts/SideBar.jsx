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



  useEffect(() => {
    if (width >= 768) {
      setOpen(true);
    }
    else {
      setOpen(false);
    }

  }, [width]);

  // useEffect(() => {
  //   const mainContent = document.getElementById("main-content");
  //   if (mainContent) {
  //     setMainContentHeight(mainContent.clientHeight);

  // }, [height]);



  return (
    <div
      className="flex flex-col w-full lg:w-72 md:w-64 text-white bg-gray-900 flex-shrink-0"
    >
      <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
        <span
          className="text-lg font-semibold tracking-widest text-white uppercase rounded-lg"
        >
          Salon Xpert
        </span>
        <button
          className="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline"
          onClick={toggleDropdown}
        >
          <Bars3Icon className="h-8 w-8 stroke-2" />
        </button>
      </div>
      {open && (
        <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
          {permissions.map((permission, index) => (
            <div key={index} className="m-2">
              <span className="block px-2 py-2 text-xs font-semibold text-gray-400">{permission.rolePermission}</span>
              {permission.functions.map((func, i) => (
                <SideBarMenuItem key={i} isSelected={false} name={func.name} path={func.route} />
              ))}
            </div>
          ))}
          <SideBarMenuItem isSelected={false} name={'Log Out'} path={'/'} />
        </nav>
      )}
    </div >
  );
}