import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import Settings from "./components/settings";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { checkUser, authUser, isCheckingUserLoader } = useAuthStore();
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const { theme } = useThemeStore();
  if (isCheckingUserLoader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin text-primary size-10" />
      </div>
    );
  }
  return (
    <main data-theme={theme}>
      <Toaster position="top-center" reverseOrder={false} />
      {authUser && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/sign-in"} replace />}
        />
        <Route
          path="/sign-in"
          element={
            !authUser ? <SignIn /> : <Navigate to={"/sign-in"} replace />
          }
        />
        <Route
          path="/sign-up"
          element={
            !authUser ? <SignUp /> : <Navigate to={"/sign-up"} replace />
          }
        />
        <Route
          path="/profile"
          element={
            authUser ? <Profile /> : <Navigate to={"/profile"} replace />
          }
        />
        <Route
          path="/settings"
          element={
            authUser ? <Settings /> : <Navigate to={"/settings"} replace />
          }
        />
      </Routes>
    </main>
  );
};

export default App;
