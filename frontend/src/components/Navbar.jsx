import React from "react";

const Navbar = () => {
  return (
    <nav className="px-10 py-5 bg-blue-500">
      <div>
        <h1 className="text-blue-100 text-2xl font-light">
          SPA<span className="text-blue-200 font-black">Auth</span>
        </h1>
        <p className="text-white">
          by <span className="font-bold">NyeowsZ</span>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
