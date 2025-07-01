import { useState, useEffect } from "react";
import {
  CameraIcon,
  LoaderIcon,
  UserIcon,
  MailIcon,
  ArrowLeftIcon,
  Trash2Icon,
} from "lucide-react";
import PageLoader from "../components/PageLoader";
import useAuthUser from "../hooks/useAuthUser";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { uploadImage } from "../utils/uploadImage";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ProfilePage = () => {
  const { authUser, isLoading, refetchUser } = useAuthUser();
  const { updateProfileMutation, isUpdating } = useUpdateProfile();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [isRemovingImage, setIsRemovingImage] = useState(false);

  // Only update form data when authUser changes and is not null
  useEffect(() => {
    if (authUser) {
      setFormData({
        username: authUser.name || "",
        email: authUser.email || "",
      });
    }
  }, [authUser?._id]); // Only depend on the ID to prevent unnecessary updates

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(
          `Please upload a valid image file (${ALLOWED_FILE_TYPES.join(", ")})`
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const toastId = toast("Uploading profile picture...", {
        duration: Infinity,
        icon: "🔄",
      });

      try {
        // Upload the image using our utility
        const profileImage = await uploadImage(file);

        // Update the user profile with the new image data
        await updateProfileMutation({ profileImage });

        // Clear the input value to allow uploading the same file again
        e.target.value = "";

        toast.success("Profile picture uploaded successfully", {
          id: toastId,
          duration: 3000, 
        });
      } catch (error) {
        toast.error("Failed to upload profile picture", {
          id: toastId,
          duration: 3000, 
        });
        throw error;
      }
    } catch (error) {
      console.error("Error in handleImageUpload:", error);
    }
  };

  const handleRemoveImage = async () => {
    try {
      if (!authUser?.profileImage) return;

      setIsRemovingImage(true);

      const toastId = toast("Removing profile picture...", {
        duration: Infinity,
        icon: "🔄",
      });

      // Call API to remove profile image
      const response = await axiosInstance.put(
        API_PATHS.USERS.UPDATE_USER(authUser._id),
        { profileImage: null }
      );

      if (response.data) {
        // Refetch user data to update UI
        await refetchUser();

        toast.success("Profile picture removed successfully", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error removing profile image:", error);
      toast.error("Failed to remove profile picture", {
        duration: 3000,
      });
    } finally {
      setIsRemovingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username.trim() === "") {
      return toast.error("Username is required");
    }
    if (formData.email.trim() === "") {
      return toast.error("Email is required");
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return toast.error("Please enter a valid email address");
    }

    // Only update if values have changed
    const updates = {};
    if (formData.username !== authUser.name) {
      updates.username = formData.username;
    }
    if (formData.email !== authUser.email) {
      updates.email = formData.email;
    }

    // Only make API call if there are changes
    if (Object.keys(updates).length > 0) {
      updateProfileMutation(updates);
    } else {
      toast.success("No changes to update", {
        duration: 3000,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading || !authUser) return <PageLoader />;

  return (
    <div className="h-screen">
      <div className="max-w-2xl mx-auto py-4 relative">
        <Link to="/" className="absolute left-2 top-6 btn btn-ghost btn-circle">
          <ArrowLeftIcon className="size-6" />
        </Link>

        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-base-content/70">
              Your profile information
            </p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className={`
                w-20 h-20 rounded-full bg-blue-100/50 overflow-hidden
                ${isUpdating || isRemovingImage ? "opacity-50" : ""}
              `}
              >
                {authUser?.profileImage?.url ? (
                  <img
                    src={authUser.profileImage.url}
                    alt={authUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserIcon className="text-4xl text-primary" />
                  </div>
                )}
                {(isUpdating || isRemovingImage) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LoaderIcon className="size-8 text-primary animate-spin" />
                  </div>
                )}
              </div>

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute -bottom-3 -right-3 
                  bg-blue-400 hover:bg-blue-500 hover:scale-110
                  p-2 rounded-full cursor-pointer shadow-md
                  transition-all duration-200
                  ${
                    isUpdating || isRemovingImage
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                `}
              >
                <CameraIcon className="w-4 h-4 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept={ALLOWED_FILE_TYPES.join(",")}
                  onChange={handleImageUpload}
                  disabled={isUpdating || isRemovingImage}
                />
              </label>

              {authUser?.profileImage?.url && (
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 hover:scale-110 text-white rounded-full absolute -bottom-3 -left-3 transition-all duration-200"
                  onClick={handleRemoveImage}
                  disabled={isUpdating || isRemovingImage}
                >
                  <Trash2Icon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-center text-base-content/70">
            {isUpdating
              ? "Updating profile picture..."
              : isRemovingImage
              ? "Removing profile picture..."
              : "Click the camera icon to update your photo"}
          </p>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <UserIcon className="size-4" />
                Your Name
              </div>
              <input
                name="username"
                className="block w-full px-4 py-2.5 bg-base-200 rounded-lg border border-base-300"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <MailIcon className="size-4" />
                Email Address
              </div>
              <input
                name="email"
                type="email"
                className="block w-full px-4 py-2.5 bg-base-200 rounded-lg border border-base-300"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating || isRemovingImage}
              className="btn btn-primary w-full"
            >
              {isUpdating ? (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Updating Profile...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>

          {/* Account Information */}
          <div className="mt-6 bg-base-200 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-base-300">
                <span>Member Since</span>
                <span>{new Date(authUser.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
