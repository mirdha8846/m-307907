
import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "./MainNav";

const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 h-full hidden md:block">
        <MainNav />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
