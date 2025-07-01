import { useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/userContext";
import { toast } from "react-hot-toast";

const useUpdateProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, updateUser } = useContext(UserContext);

  const updateProfileMutation = async (updates) => {
    setIsUpdating(true);
    try {
      // If we have a profileImage object from the upload utility
      if (updates.profileImage) {
        // The image is already uploaded, just update the user with the new image data
        const userResponse = await axiosInstance.put(
          API_PATHS.USERS.UPDATE_USER(user._id),
          { profileImage: updates.profileImage }
        );

        if (userResponse.data) {
          updateUser(userResponse.data);
          toast.success("Profile picture updated successfully");
        }
        return;
      }

      // Handle other profile updates
      const updateData = {
        ...(updates.username && { name: updates.username }),
        ...(updates.email && { email: updates.email }),
      };

      // Only make the API call if there are updates to make
      if (Object.keys(updateData).length > 0) {
        const userResponse = await axiosInstance.put(
          API_PATHS.USERS.UPDATE_USER(user._id),
          updateData
        );

        if (userResponse.data) {
          updateUser(userResponse.data);
          toast.success("Profile updated successfully");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProfileMutation, isUpdating };
};

export default useUpdateProfile;
