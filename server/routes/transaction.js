const express = require("express");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ADD TRANSACTION (Protected)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    const newTransaction = new Transaction({
      user: req.userId,
      type,
      amount,
      category,
      description,
      date,
    });

    await newTransaction.save();

    res.status(201).json({
      message: "Transaction added successfully",
      transaction: newTransaction,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// GET ALL TRANSACTIONS (Protected)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId })
      .sort({ date: -1 });

    res.json(transactions);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// DELETE TRANSACTION (Protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne();

    res.json({ message: "Transaction deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// GET SUMMARY (Protected)
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        totalIncome += t.amount;
      } else {
        totalExpense += t.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
