import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";
import { toast } from "react-hot-toast";

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Return the full profileImage object
    return response.data.profileImage;
  } catch (error) {
    console.error("Error uploading image:", error);

    // Handle specific error cases
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Failed to upload image";
      if (error.response.status === 413) {
        toast.error("Image size is too large. Please choose a smaller image.", {
          duration: 3000, // 3 seconds
        });
      } else if (error.response.status === 400) {
        toast.error(errorMessage, {
          duration: 3000, // 3 seconds
        });
      } else if (error.response.status === 500) {
        toast.error("Server error. Please try again later.", {
          duration: 3000, // 3 seconds
        });
        // Log additional error details in development
        if (import.meta.env.NODE_ENV === "development") {
          console.error("Upload error details:", error.response.data);
        }
      } else {
        toast.error(errorMessage, {
          duration: 3000, // 3 seconds
        });
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.", {
        duration: 3000, // 3 seconds
      });
    } else {
      toast.error("Failed to upload image. Please try again.", {
        duration: 3000, // 3 seconds
      });
    }

    throw error;
  }
};
