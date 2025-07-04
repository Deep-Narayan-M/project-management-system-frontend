import React from "react";
// import UI_IMG from "../../assets/images/auth-img.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-[20%] lg:w-[33%] bg-gradient-to-br from-blue-100 to-blue-200 bg-[url('/bg-img.png')] bg-cover bg-center relative overflow-hidden"></div>

      <div className="w-full md:w-[60%] lg:w-[100%] px-6 md:px-12 lg:px-16 py-8 flex flex-col">
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
