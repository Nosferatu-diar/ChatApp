import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const App = () => {
  const { checkUser, authUser, isCheckingUserLoader } = useAuthStore();
  useEffect(() => {
    //  const checkUserStatus = async () => {
    //    await checkUser();
    //  };
    //  checkUserStatus();
    checkUser();
  }, [checkUser]);
  if (isCheckingUserLoader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin text-primary size-10" />
      </div>
    );
  }

  return (
    <main>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/sign-in"} replace />}
        />
        <Route
          path="/sign-in"
          element={!authUser ? <SignIn /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/sign-up"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} replace />}
        />
      </Routes>
    </main>
  );
};

export default App;
