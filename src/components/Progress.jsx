import React from "react";

const Progress = ({ progress, status }) => {
  const getColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-500";

      case "Completed":
        return "bg-lime-500";

      default:
        return "bg-violet-500";
    }
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className={`${getColor()} h-full rounded-full transition-all duration-300 relative`}
        style={{ width: `${progress}%` }}
      >
        {progress >= 30 && (
          <div className="absolute inset-0 bg-white/20 animate-pulse-light"></div>
        )}
      </div>
    </div>
  );
};

export default Progress;
