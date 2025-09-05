import React, { useState } from "react";
import StatusIndicator from "../features/StatusIndicator";
import axios from "axios";

const LoopbackTest = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(null);

  const SendLoopback = async () => {
    setIsLoading(true);
    setHasError(null);
    setResponse("");
    setStatus(null);

    try {
      const res = await axios.post(
        "https://unique-suited-albacore.ngrok-free.app/api/loopback",
        { message: message },
        { withCredentials: true }
      );
      setHasError(false);
      setResponse(res.data.message);
      setStatus(res.data.status);
    } catch (error) {
      setHasError(true);

      if (error?.response?.data?.message) {
        setStatus(error.response.data.message);
      } else {
        setStatus(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-5">
      <h1 className="font-bold text-blue-900 text-[18px]">Loopback Test</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a string..."
          className="p-2 rounded-l border-1 border-neutral-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={SendLoopback}
          className="text-white font-semibold bg-blue-500 p-2 rounded-r cursor-pointer hover:bg-blue-600 active:bg-blue-700"
        >
          Loopback
        </button>
      </div>

      <div className="flex items-center gap-2">
        <StatusIndicator isLoading={isLoading} hasError={hasError} />
        <p>{status ? status : "--"}</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold text-blue-900">Response:</h2>
        <p className="border-1 min-h-10 rounded p-2 max-w-150 border-neutral-200 bg-neutral-200 text-neutral-900">
          {response ? response : "--"}
        </p>
      </div>
    </div>
  );
};

export default LoopbackTest;
