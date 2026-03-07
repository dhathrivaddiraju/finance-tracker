import { useEffect, useState } from "react";
import axios from "axios";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchTransactions(token);
  }, []);

  const fetchTransactions = async (token) => {
    const res = await axios.get(
      "http://localhost:5000/api/transactions",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTransactions(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/transactions/add",
      { type, amount, category },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setAmount("");
    setCategory("");
    fetchTransactions(token);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(
      `http://localhost:5000/api/transactions/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTransactions(token);
  };

  const handleEdit = (t) => {
    setEditingId(t._id);
    setType(t.type);
    setAmount(t.amount);
    setCategory(t.category);
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/transactions/${id}`,
      { type, amount, category },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEditingId(null);
    fetchTransactions(token);
  };

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold">Transactions</h2>

      {/* Add Transaction */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        <form onSubmit={handleAdd} className="flex gap-4 flex-wrap">

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded dark:bg-gray-800"
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
            className="border p-2 rounded dark:bg-gray-800"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border p-2 rounded dark:bg-gray-800"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>

        </form>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t._id} className="border-b dark:border-gray-800">

                {editingId === t._id ? (
                  <>
                    <td>
                      <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-1 rounded dark:bg-gray-800"
                      />
                    </td>
                    <td>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border p-1 rounded dark:bg-gray-800"
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </td>
                    <td>
                      <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border p-1 rounded dark:bg-gray-800"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleUpdate(t._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{t.category}</td>
                    <td>{t.type}</td>
                    <td>₹{t.amount}</td>
                    <td className="space-x-2">
                      <button
                        onClick={() => handleEdit(t)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Transactions;
