import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 backdrop-blur-md py-3 px-4 md:px-7 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          className="block lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-xl" />
          ) : (
            <HiOutlineMenu className="text-xl" />
          )}
        </button>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <img
              src="/project-management.svg"
              alt="WorkNest Logo"
              className="w-9 h-9 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white hidden md:block"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 tracking-tight flex items-center">
              WorkNest
            </h2>
            <div className="flex items-center justify-around gap-1">
              <div className="h-0.5 w-2/5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded mt-1"></div>
              <div className="h-0.5 w-2/5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2"></div>

      {openSideMenu && (
        <div className="fixed top-[57px] left-0 w-64 h-[calc(100vh-57px)] z-40 shadow-xl">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
