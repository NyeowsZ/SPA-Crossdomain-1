import React, { useState } from "react";
import axios from "axios";
import StatusIndicator from "../features/StatusIndicator";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [status, setStatus] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setHasError(false);
    setStatus(null);

    try {
      // Get CSRF cookie first
      await axios.get("https://unique-suited-albacore.ngrok-free.app/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // Send login request
      const res = await axios.post(
        "https://unique-suited-albacore.ngrok-free.app/api/login",
        { username, password },
        { withCredentials: true }
      );

      setStatus(res.data.message || "Successfully Logged In");
    } catch (error) {
      setHasError(true);
      let message = "Login failed";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      }
      setStatus(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-[18px] font-bold text-blue-900">Login Account</h1>

      <div className="flex items-center gap-1">
        <div className="space-x-1">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded border border-neutral-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded border border-neutral-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="text-white font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer p-2 rounded"
        >
          Login
        </button>
      </div>

      <div className="flex items-center gap-2">
        <StatusIndicator isLoading={isLoading} hasError={hasError} />
        <p>{status ? status : "--"}</p>
      </div>
    </div>
  );
};

export default Login;
