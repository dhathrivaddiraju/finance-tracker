import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Analytics({ darkMode }) {
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

  const axisColor = darkMode ? "#e5e7eb" : "#374151";
  const tooltipBg = darkMode ? "#1f2937" : "#ffffff";
  const tooltipText = darkMode ? "#f9fafb" : "#111827";

  const pieData = [
    { name: "Income", value: summary.totalIncome },
    { name: "Expense", value: summary.totalExpense },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const categoryTotals = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const barData = Object.keys(categoryTotals).map((category) => ({
    category,
    amount: categoryTotals[category],
  }));

  return (
    <div className="space-y-10">

      <h2 className="text-2xl font-bold">
        Analytics Overview
      </h2>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition-colors duration-300">
        <h4 className="mb-4 text-gray-600 dark:text-gray-300">
          Income vs Expense
        </h4>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: "none",
                borderRadius: "10px",
              }}
              labelStyle={{ color: tooltipText }}
              itemStyle={{ color: tooltipText }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow transition-colors duration-300">
        <h4 className="mb-4 text-gray-600 dark:text-gray-300">
          Expense by Category
        </h4>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="category" stroke={axisColor} />
            <YAxis stroke={axisColor} />

            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: "none",
                borderRadius: "10px",
              }}
              labelStyle={{ color: tooltipText }}
              itemStyle={{ color: tooltipText }}
            />

            <Bar
              dataKey="amount"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Analytics;
