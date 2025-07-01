import React from "react";
import Progress from "../Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/20";

      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";

      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/20";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/20";

      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/20";

      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/20";
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case "In Progress":
        return "border-cyan-500";
      case "Completed":
        return "border-lime-500";
      default:
        return "border-violet-500";
    }
  };

  return (
    <div
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <div
          className={`text-[11px] font-medium ${getStatusTagColor()} px-3 py-1 rounded-full`}
        >
          {status}
        </div>
        <div
          className={`text-[11px] font-medium ${getPriorityTagColor()} px-3 py-1 rounded-full`}
        >
          {priority} Priority
        </div>
      </div>

      <div className={`pl-3 border-l-[3px] ${getBorderColor()}`}>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="mb-3">
          <p className="text-xs font-medium text-gray-700 mb-1">
            Task Done:{" "}
            <span className="font-bold">
              {completedTodoCount} / {todoChecklist.length || 0}
            </span>
          </p>
          <Progress progress={progress} status={status} />
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200 mt-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] text-gray-500">Start Date</p>
            <p className="text-xs font-medium text-gray-900">
              {moment(createdAt).format("Do MMM YYYY")}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-gray-500">Due Date</p>
            <p className="text-xs font-medium text-gray-900">
              {moment(dueDate).format("Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <AvatarGroup avatars={assignedTo || []} />

          {attachmentCount > 0 && (
            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded-lg">
              <LuPaperclip className="text-xs" />
              <span className="text-xs font-medium">{attachmentCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
