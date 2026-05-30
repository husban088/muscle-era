"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LoadingOverlay from "./LoadingOverlay";
import Chat from "./Chat";
import { ChartBarIcon } from "@heroicons/react/24/outline";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    setNextPath(path);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (nextPath) {
      window.location.href = nextPath;
      setNextPath(null);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative font-zen-dots">
      <Navbar
        _isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onNavigate={handleNavigation}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onNavigate={handleNavigation}
      />
      <LoadingOverlay
        isLoading={isLoading}
        onComplete={handleLoadingComplete}
      />
      <main>{children}</main>
      {/* Message Icon */}
      <button
        onClick={toggleChat}
        className="fixed bottom-9 right-6 z-[3000] bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition-colors"
        aria-label="Open chat"
      >
        <ChartBarIcon className="h-6 w-6" />
      </button>
      {/* Chat Section */}
      <div
        className={`fixed bottom-0 z-[3000] right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ${
          isChatOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Chat toggleChat={toggleChat} />
      </div>
    </div>
  );
}
