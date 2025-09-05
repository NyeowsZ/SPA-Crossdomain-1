import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [status, setStatus] = useState(null);
  const [response, setResponse] = useState("");
  const [hasError, setHasError] = useState(null);

  const HealthCheck = async () => {
    setIsLoading(true);

    setStatus(null);
    setResponse("");
    setHasError(null);

    try {
      await axios.get(
        "https://unique-suited-albacore.ngrok-free.app/sanctum/csrf-cookie",
        { withCredentials: true }
      );

      const response = await axios.post(
        "https://unique-suited-albacore.ngrok-free.app/api/healthcheck",
        {},
        { withCredentials: true, withXSRFToken: true }
      );

      setResponse(response.data.message);
      setStatus(response.status);
    } catch (error) {
      setHasError(true);

      if (error?.response?.data?.message) {
        setStatus(error.response.data.message);
      } else if (error?.response) {
        setStatus(
          `Error ${error.response.status}: ${error.response.statusText}`
        );
      } else {
        setStatus(error.message || "An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5">
        <h1 className="font-black text-2xl pb-5">HealthCheck</h1>

        <button
          onClick={HealthCheck}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-2 px-10 text-lg rounded-[10px]"
        >
          Ping
        </button>

        <div className="flex items-center gap-2">
          {isLoading === null ? (
            <span className="block rounded-full size-3 bg-neutral-500"></span>
          ) : isLoading ? (
            <span className="border-3 border-blue-500 size-6 block rounded-full border-t-white animate-spin"></span>
          ) : !hasError ? (
            <span className="block rounded-full size-3 bg-green-500"></span>
          ) : (
            <span className="block rounded-full size-3 bg-red-500"></span>
          )}

          <p>{status ? status : "--"}</p>
        </div>

        <div>
          <p className="flex items-center gap-2">
            <span className="font-semibold">Message:</span>
            {response ? response : "--"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
