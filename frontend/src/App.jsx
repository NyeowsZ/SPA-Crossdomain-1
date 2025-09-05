import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import HealthCheck from "./components/HealthCheck";
import LoopbackTest from "./components/LoopbackTest";
import RegisterAccount from "./components/RegisterAccount";
import Login from "./components/Login";
import AuthCheck from "./components/AuthCheck";
import axios from "axios";


export const api = axios.create({
    baseURL: "https://unique-suited-albacore.ngrok-free.app",
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",    
    xsrfHeaderName: "X-XSRF-TOKEN",  
  });

const App = () => {

  

  useEffect(() => {
    const getCsrfCookie = async () => {
      await axios.get(
        "https://unique-suited-albacore.ngrok-free.app/sanctum/csrf-cookie",
        { withCredentials: true }
      );
    };

    getCsrfCookie();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center gap-10 py-5 px-10">
          <div className="space-y-10">
            <HealthCheck />
            <LoopbackTest />
            <RegisterAccount />
            <Login />
            <AuthCheck />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
