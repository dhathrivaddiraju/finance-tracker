import { useEffect, useState } from "react";
import axios from "axios";

function Overview() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchData(token);
  }, []);

  const fetchData = async (token) => {
    const tRes = await axios.get(
      "https://finance-tracker-z7ls.onrender.com/api/transactions",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const sRes = await axios.get(
      "https://finance-tracker-z7ls.onrender.com/api/transactions/summary",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTransactions(tRes.data);
    setSummary(sRes.data);
  };

  const balance = summary.totalIncome - summary.totalExpense;

  const savingsRatio =
    summary.totalIncome > 0
      ? ((balance / summary.totalIncome) * 100).toFixed(1)
      : 0;

  const generateSuggestion = () => {
    if (summary.totalExpense > summary.totalIncome)
      return "🚨 Your expenses exceed your income. Immediate adjustment needed.";
    if (savingsRatio < 20)
      return "⚠️ Try to save at least 20% of your income for financial stability.";
    return "✅ Great job! Your financial health looks strong.";
  };

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold">
        Financial Overview
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition">
          <h4 className="text-gray-600 dark:text-gray-300">
            Total Income
          </h4>
          <p className="text-green-500 text-xl font-bold mt-2">
            ₹{summary.totalIncome}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition">
          <h4 className="text-gray-600 dark:text-gray-300">
            Total Expense
          </h4>
          <p className="text-red-500 text-xl font-bold mt-2">
            ₹{summary.totalExpense}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition">
          <h4 className="text-gray-600 dark:text-gray-300">
            Current Balance
          </h4>
          <p className="text-blue-500 text-xl font-bold mt-2">
            ₹{balance}
          </p>
        </div>

      </div>

      {/* SMART SUGGESTION SECTION */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition">
        <h4 className="text-gray-600 dark:text-gray-300 mb-2">
          Smart Insight
        </h4>
        <p className="text-lg font-medium">
          {generateSuggestion()}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Savings Ratio: {savingsRatio}%
        </p>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition">
        <h4 className="text-gray-600 dark:text-gray-300 mb-4">
          Recent Transactions
        </h4>

        {transactions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No transactions yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {transactions.slice(0, 5).map((t) => (
              <li
                key={t._id}
                className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2"
              >
                <span>{t.category}</span>
                <span
                  className={
                    t.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  ₹{t.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default Overview;
