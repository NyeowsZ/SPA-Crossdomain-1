import React from "react";

const Login = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-[18px] font-bold text-blue-900">Login Account</h1>

      <div className="flex items-center gap-1">
        <div className="space-x-1">
          <input
            type="text"
            placeholder="Username"
            className="p-2 rounded border border-neutral-500"
          />
          <input
            type="text"
            placeholder="Password"
            className="p-2 rounded border border-neutral-500"
          />
        </div>

        <button className="text-white font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer p-2 rounded">
          Login
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="size-3 rounded-full block bg-green-500"></span>
        <p>Account Successfully Logged In</p>
      </div>
    </div>
  );
};

export default Login;
