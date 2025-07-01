import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import { uploadImage } from "../../utils/uploadImage";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      toast.error("Please enter full name.", { duration: 4000 });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.", { duration: 4000 });
      return;
    }

    if (!password) {
      toast.error("Please enter the password", { duration: 4000 });
      return;
    }

    setIsLoading(true);

    try {
      // Create user data object
      const userData = {
        name: fullName,
        email,
        password,
      };

      // Add admin token if provided
      if (adminInviteToken) {
        userData.adminInviteToken = adminInviteToken;
      }

      // Handle profile image separately - don't upload during signup
      if (profilePic) {
        // We'll register the user first, then update the profile image
        console.log("Profile pic selected, will upload after registration");
      }

      // Register the user without the profile image first
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        userData
      );

      const { token, role } = response.data;

      if (token) {
        // Store token immediately
        localStorage.setItem("token", token);

        // If we have a profile pic, upload it now that we're authenticated
        if (profilePic) {
          try {
            const toastId = toast("Setting up your profile picture...", {
              duration: Infinity,
              icon: "🔄",
            });

            console.log("Uploading profile picture after registration");
            // Upload the image
            const formData = new FormData();
            formData.append("profileImage", profilePic);

            const profileImage = await uploadImage(formData);

            // Update the user with the new profile image
            const userResponse = await axiosInstance.put(
              API_PATHS.AUTH.UPDATE_PROFILE,
              {
                profileImage: profileImage.url,
              }
            );

            // Update the user context with the updated user data
            updateUser(userResponse.data);

            toast.success("Account created with profile picture!", {
              id: toastId,
              duration: 3000, 
            });
          } catch (imageError) {
            console.error("Error uploading profile image:", imageError);
            toast.error(
              "Account created, but failed to upload profile picture. You can try again later.",
              {
                duration: 3000, 
              }
            );
            // Still update the user context with the initial user data
            updateUser(response.data);
          }
        } else {
          // No profile pic, just update the user context
          updateUser(response.data);
          toast.success("Account created successfully!", {
            duration: 3000, 
          });
        }

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { duration: 4000 });
      } else {
        toast.error("Something went wrong. Please try again.", {
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Ram Kumar"
              type="text"
              disabled={isLoading}
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="ram@gmail.com"
              type="text"
              disabled={isLoading}
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
              disabled={isLoading}
            />

            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="text"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`btn-primary ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "SIGNING UP..." : "SIGN UP"}
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
