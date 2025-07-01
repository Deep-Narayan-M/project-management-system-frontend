import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-1">
        <div className={`w-2 h-5 ${color} rounded-full`} />
        <p className="text-sm text-gray-600 font-medium">{label}</p>
      </div>

      <p className="text-xl md:text-2xl font-bold text-gray-900 pl-5 mt-2">
        {value}
      </p>
    </div>
  );
};

export default InfoCard;
