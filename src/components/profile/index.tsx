import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Profile = () => {
  const { authUser, imgUploadLoading, updatePhoto } = useAuthStore();
  const handleSubmit = (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    updatePhoto(formData);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  authUser?.profilePic ||
                  "https://raw.githubusercontent.com/burakorkmez/fullstack-chat-app/refs/heads/master/frontend/public/avatar.png"
                }
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200
                  ${
                    imgUploadLoading ? "animate-pulse pointer-events-none" : ""
                  } `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  disabled={imgUploadLoading}
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleSubmit}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              Click the camera icon to update your photo
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>
                    {authUser?.createdAt
                      ? authUser.createdAt.split("T")[0]
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
