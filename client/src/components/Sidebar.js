import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const navItem = (path, label) => {
    const isActive = location.pathname === path;

    return (
      <Link
        to={path}
        className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-200 dark:hover:bg-gray-800"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="w-64 min-h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-colors duration-300">

      <h1 className="text-2xl font-bold mb-10">
        SmartFinance
      </h1>

      <nav className="space-y-2">
        {navItem("/dashboard", "Overview")}
        {navItem("/transactions", "Transactions")}
        {navItem("/analytics", "Analytics")}
        {navItem("/budget", "Budget")}
        {navItem("/settings", "Settings")}
      </nav>

    </div>
  );
}

export default Sidebar;
