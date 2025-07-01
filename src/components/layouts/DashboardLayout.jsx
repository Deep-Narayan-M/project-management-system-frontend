import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="flex-1 px-4 md:px-6 py-4 md:py-6 max-w-full">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
