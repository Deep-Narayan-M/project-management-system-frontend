import React from "react";
import { AlertTriangle } from "lucide-react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="size-14 rounded-full bg-rose-100 grid place-items-center mb-4">
        <AlertTriangle className="size-7 text-rose-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Confirm Deletion
      </h3>
      <p className="text-sm text-gray-600 text-center mb-6">{content}</p>

      <div className="flex gap-3 w-full">
        {onCancel && (
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2.5 cursor-pointer transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg px-4 py-2.5 cursor-pointer transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
