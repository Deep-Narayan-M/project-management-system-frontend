import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ children, isOpen, onClose, title }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] m-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal content */}
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 bg-gray-100/50 hover:bg-gray-100 rounded-full p-1.5 inline-flex items-center justify-center transition-colors"
              onClick={onClose}
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-[70vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
