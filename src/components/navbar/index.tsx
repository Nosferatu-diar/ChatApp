import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  return (
    <header className="border-b border-base-300 sticky w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to={"/"} className="flex items-center gap-2">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg">Chatty</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <Link
              to={"/profile"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <div
              onClick={() => {
                logout();
                navigate("/sign-in");
              }}
              className="btn btn-sm gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">LogOut</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
