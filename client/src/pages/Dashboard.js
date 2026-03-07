import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchTransactions(token);
    fetchSummary(token);
  }, [navigate]);

  const fetchTransactions = async (token) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSummary = async (token) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/transactions/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/transactions/add",
        { type, amount, category, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAmount("");
      setCategory("");
      setDescription("");

      fetchTransactions(token);
      fetchSummary(token);
    } catch (error) {
      alert("Error adding transaction");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `http://localhost:5000/api/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTransactions(token);
      fetchSummary(token);
    } catch (error) {
      alert("Error deleting transaction");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
<h1 className="text-4xl text-red-500">
  NEW MODERN DASHBOARD
</h1>

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* HEADER */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">💰 Finance Tracker</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-6">

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Total Income</h3>
            <p className="text-green-600 text-2xl font-bold">
              ₹{summary.totalIncome}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Total Expense</h3>
            <p className="text-red-600 text-2xl font-bold">
              ₹{summary.totalExpense}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Balance</h3>
            <p
              className={`text-2xl font-bold ${
                summary.balance >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ₹{summary.balance}
            </p>
          </div>

        </div>

        {/* ADD TRANSACTION */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>

          <form
            onSubmit={handleAddTransaction}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              Add
            </button>
          </form>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Recent Transactions
          </h3>

          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions found</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((t) => (
                  <tr key={t._id} className="border-b">
                    <td className="py-2 capitalize">{t.type}</td>
                    <td className="py-2">₹{t.amount}</td>
                    <td className="py-2">{t.category}</td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
