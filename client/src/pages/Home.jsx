import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main Content*/}
      <main className="flex-1 overflow-auto">
        <div>
          <Navbar />
        </div>
       <div className="p-4">
         <Outlet />
       </div>
      </main>
    </div>
  );
};

export default Home;
