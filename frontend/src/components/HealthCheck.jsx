import React, { useState } from "react";
import axios from "axios";
import StatusIndicator from "../features/StatusIndicator";

const HealthCheck = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [hasError, setHasError] = useState(false);

  const SendPing = async () => {
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://unique-suited-albacore.ngrok-free.app/api/healthcheck/",
        {}
      );
      setResponse(res.data.message);
      setHasError(false);
    } catch (error) {
      setHasError(true);

      if (error?.response?.data?.message) {
        setResponse(error.response.data.message);
      } else {
        setResponse(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="font-bold text-[18px] text-blue-900">Health Check</h1>

      <div className="flex items-center gap-5">
        <button
          className="text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 font-semibold px-5 py-2 rounded cursor-pointer"
          onClick={SendPing}
        >
          Ping
        </button>
        <div className="flex items-center gap-2">
          <StatusIndicator isLoading={isLoading} hasError={hasError} />

          <p>{response ? response : "--"}</p>
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;
