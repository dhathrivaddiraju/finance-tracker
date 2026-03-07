import React from "react";
import Sidebar from "./Sidebar";

function Layout({ children, darkMode, setDarkMode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      <Sidebar />

      <div className="flex-1">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
          <h2 className="text-xl font-semibold">
            Financial Dashboard
          </h2>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {React.isValidElement(children)
            ? React.cloneElement(children, { darkMode, setDarkMode })
            : children}
        </div>

      </div>

    </div>
  );
}

export default Layout;
