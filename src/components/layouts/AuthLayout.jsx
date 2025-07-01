import React from "react";
// import UI_IMG from "../../assets/images/auth-img.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-[20%] lg:w-[33%] bg-gradient-to-br from-blue-100 to-blue-200 bg-[url('/bg-img.png')] bg-cover bg-center relative overflow-hidden"></div>

      <div className="w-full md:w-[60%] lg:w-[100%] px-6 md:px-12 lg:px-16 py-8 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Project Management System
            </h2>
            <div className="flex items-center justify-around gap-0.5">
              <div className="h-0.5 w-2/5 bg-blue-500 rounded  mt-1"></div>
              <div className="h-0.5 w-2/5 bg-blue-500  rounded mt-1"></div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md flex justify-center">{children}</div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} Project Management System. All rights
          reserved.
        </div>
      </div>

      <div className="hidden md:flex md:w-[20%] lg:w-[33%] bg-gradient-to-br from-blue-100 to-blue-200 bg-[url('/bg-img.png')] bg-cover bg-center relative overflow-hidden"></div>

      {/* <div className="hidden md:flex md:w-[45%] lg:w-[50%] bg-gradient-to-br from-blue-100 to-blue-200 bg-[url('/bg-img.png')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full p-8">
          <img
            src={UI_IMG}
            alt="Project Management System"
            className="w-4/5 max-w-md object-contain drop-shadow-xl animate-in fade-in zoom-in-95"
          />
        </div>
      </div> */}
    </div>
  );
};

export default AuthLayout;
