import { useState } from "react";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import { Outlet, Navigate } from "react-router-dom";

export default function Layout({ status }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 1. WHILE LOADING or IDLE - Don't show anything or redirect
  if (status === "loading" || status === "idle") {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-500 font-medium animate-pulse">Initializing System...</p>
      </div>
    );
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-screen flex overflow-hidden">
        {/* LEFT SIDEBAR - Fixed height, spans full height */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* RIGHT SIDE AREA - Navbar + Main Content */}
        <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">

          {/* TOP NAVBAR - Sticky, full width of the right area */}
          <Navbar
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-400 mx-auto">
              <Outlet />
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
