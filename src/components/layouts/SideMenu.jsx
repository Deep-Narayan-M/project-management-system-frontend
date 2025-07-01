import React, { useContext, useEffect, useState } from "react";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handelLogout();
      return;
    }

    navigate(route);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
    return () => {};
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-57px)] bg-white border-r border-gray-200 sticky top-[57px] z-20 overflow-y-auto">
      <div className="flex flex-col items-center justify-center py-6 border-b border-gray-200">
        <div
          className="relative group cursor-pointer"
          onClick={handleProfileClick}
        >
          <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-blue-500/20 ring-offset-2 ring-offset-white transition-all hover:ring-blue-500/50">
            <img
              src={user?.profileImage?.url || ""}
              alt={user?.name || "Profile"}
              className="w-full h-full object-cover bg-gray-300"
              onError={(e) => {
                e.target.src =
                  "https://ui-avatars.com/api/?name=" + (user?.name || "User");
              }}
            />
          </div>

          {user?.role === "admin" && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-[10px] font-medium text-white bg-blue-600 px-3 py-0.5 rounded-full shadow-sm">
              Admin
            </div>
          )}
        </div>

        <h5 className="text-gray-900 font-medium mt-4">{user?.name || ""}</h5>

        <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
      </div>

      <div className="py-3 px-2">
        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-3 text-[14px] font-medium rounded-lg transition-all duration-200 
              ${
                activeMenu === item.label
                  ? "text-white bg-blue-600 shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              } py-2.5 px-4 mb-1.5`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-lg" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
