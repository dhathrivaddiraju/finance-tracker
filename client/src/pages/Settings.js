import { useNavigate } from "react-router-dom";

function Settings({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold">
        Settings
      </h2>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition space-y-4">
        <h4 className="text-gray-600 dark:text-gray-300">
          Appearance
        </h4>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition space-y-4">
        <h4 className="text-gray-600 dark:text-gray-300">
          Account
        </h4>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Settings;
