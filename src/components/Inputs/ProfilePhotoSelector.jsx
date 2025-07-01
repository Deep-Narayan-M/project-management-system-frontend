import React, { useRef, useState } from "react";
import { LuUser, LuTrash, LuUpload } from "react-icons/lu";
import { toast } from "react-hot-toast";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error(
        `Please upload a valid image file (${ALLOWED_FILE_TYPES.join(", ")})`
      );
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Update the image state
    setImage(file);

    // Generate preview URL from the file
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-blue-100/50 overflow-hidden">
          {!image ? (
            <div className="w-full h-full flex items-center justify-center">
              <LuUser className="text-4xl text-primary" />
            </div>
          ) : (
            <img
              src={previewUrl}
              alt="profile photo"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <label
          htmlFor="signup-avatar-upload"
          className={`
            absolute -bottom-3 -right-3 
            bg-blue-400 hover:bg-blue-500 hover:scale-110
            p-2 rounded-full cursor-pointer shadow-md
            transition-all duration-200
          `}
        >
          <LuUpload className="h-4 w-4 text-white" />
          <input
            type="file"
            id="signup-avatar-upload"
            ref={inputRef}
            className="hidden"
            accept={ALLOWED_FILE_TYPES.join(",")}
            onChange={handleImageChange}
          />
        </label>

        {image && (
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 hover:scale-110 text-white rounded-full absolute -bottom-3 -left-3 transition-all duration-200"
            onClick={handleRemoveImage}
          >
            <LuTrash className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
