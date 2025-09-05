import React from "react";

const AuthCheck = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-[18px] font-bold text-blue-900">Auth Check</h1>

      <div className="flex items-center gap-5">
        <button className="p-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 active:bg-blue-700 cursor-pointer">
          Am I Authenticated?
        </button>
        <div className="flex items-center gap-2">
          <span className="size-3 bg-green-500 rounded-full block"></span>
          <p>You are authenticated</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="p-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 active:bg-blue-700 cursor-pointer">
          Logout
        </button>
        <div className="flex items-center gap-2">
          <span className="size-3 bg-red-500 rounded-full block"></span>
          <span className="spinner"></span>
          <p>Failed to Logout</p>
        </div>
      </div>
    </div>
  );
};

export default AuthCheck;
