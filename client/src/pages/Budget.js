import { useEffect, useState } from "react";
import axios from "axios";

function Budget() {
  const [budget, setBudget] = useState(
    localStorage.getItem("monthlyBudget") || ""
  );
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchExpenses(token);
  }, []);

  const fetchExpenses = async (token) => {
    const res = await axios.get(
      "https://finance-tracker-z7ls.onrender.com/api/transactions",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const expenses = res.data
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    setTotalExpense(expenses);
  };

  const handleSave = () => {
    localStorage.setItem("monthlyBudget", budget);
  };

  const progress =
    budget > 0 ? Math.min((totalExpense / budget) * 100, 100) : 0;

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold">
        Budget Planning
      </h2>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition space-y-4">
        <h4 className="text-gray-600 dark:text-gray-300">
          Set Monthly Budget
        </h4>

        <div className="flex gap-4">
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition space-y-4">
        <h4 className="text-gray-600 dark:text-gray-300">
          Budget Usage
        </h4>

        <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          ₹{totalExpense} spent of ₹{budget || 0}
        </p>
      </div>

    </div>
  );
}

export default Budget;
