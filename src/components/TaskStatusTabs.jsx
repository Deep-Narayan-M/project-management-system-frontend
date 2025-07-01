import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-4">
      <div className="flex flex-wrap gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.label
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            <div className="flex items-center gap-2">
              <span>{tab.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  activeTab === tab.label
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </div>

            <div
              className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 ${
                activeTab === tab.label
                  ? "bg-blue-600 scale-x-100"
                  : "bg-transparent scale-x-0"
              }`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
