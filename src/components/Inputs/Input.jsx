import React, { useState, useRef } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full">
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box cursor-text" onClick={handleBoxClick}>
        <input
          ref={inputRef}
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full h-full bg-transparent outline-none text-[15px]"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <div
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
