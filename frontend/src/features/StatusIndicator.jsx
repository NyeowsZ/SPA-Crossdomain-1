import React from "react";

const StatusIndicator = ({ isLoading, hasError }) => {
  return (
    <>
      {isLoading === null ? (
        <span className="block size-3 rounded-full bg-neutral-500"></span>
      ) : isLoading ? (
        <span className="spinner"></span>
      ) : !hasError ? (
        <span className="block size-3 rounded-full bg-green-500"></span>
      ) : (
        <span className="block size-3 rounded-full bg-red-500"></span>
      )}
    </>
  );
};

export default StatusIndicator;
