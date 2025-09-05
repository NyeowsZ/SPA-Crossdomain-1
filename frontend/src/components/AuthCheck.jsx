import React, { useState } from "react";
import axios from "axios";
import StatusIndicator from "../features/StatusIndicator";

const AuthCheck = () => {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);

  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isLogoutError, setIsLogoutError] = useState(false);
  const [logoutStatus, setLogoutStatus] = useState(null);

  const handleAuthCheck = async () => {
    setIsAuthLoading(true);
    setIsAuthError(false);
    setAuthStatus(null);

    try {
      const res = await axios.get(
        "https://unique-suited-albacore.ngrok-free.app/api/auth-check",
        { withCredentials: true }
      );
      setAuthStatus(res.data.message || "You are authenticated");
    } catch (error) {
      setIsAuthError(true);
      let message = "Auth check failed";
      if (error?.response?.data?.message) message = error.response.data.message;
      setAuthStatus(message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    setIsLogoutError(false);
    setLogoutStatus(null);

    try {
      await axios.post(
        "https://unique-suited-albacore.ngrok-free.app/logout",
        {},
        { withCredentials: true }
      );
      setLogoutStatus("Successfully logged out");
    } catch (error) {
      setIsLogoutError(true);
      let message = "Failed to logout";
      if (error?.response?.data?.message) message = error.response.data.message;
      setLogoutStatus(message);
    } finally {
      setIsLogoutLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-[18px] font-bold text-blue-900">Auth Check</h1>

      <div className="flex items-center gap-5">
        <button
          onClick={handleAuthCheck}
          className="p-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 active:bg-blue-700 cursor-pointer"
        >
          Am I Authenticated?
        </button>
        <div className="flex items-center gap-2">
          <StatusIndicator isLoading={isAuthLoading} hasError={isAuthError} />
          <p>{authStatus || "--"}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={handleLogout}
          className="p-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 active:bg-blue-700 cursor-pointer"
        >
          Logout
        </button>
        <div className="flex items-center gap-2">
          <StatusIndicator isLoading={isLogoutLoading} hasError={isLogoutError} />
          <p>{logoutStatus || "--"}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthCheck;
