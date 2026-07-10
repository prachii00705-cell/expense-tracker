import { useState } from "react";
import { exportCSV } from "../utils/exportCSV";
import { exportPDF } from "../utils/exportPDF";

function ExpenseForm({ expenses, setExpenses, clearAllExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [errors, setErrors] = useState({});

  function sanitizeInput(value) {
    return value.replace(/[<>]/g, "");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Expense name is required.";
    }

    if (!amount || Number(amount) <= 0) {
      newErrors.amount = "Enter a valid amount.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: sanitizeInput(title.trim()),
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setExpenses([...expenses, newExpense]);

    console.log(
      "[Analytics] User interacted with React Expense Tracker"
    );

    setTitle("");
    setAmount("");
    setCategory("Food");
    setErrors({});
  }

  return (
    <section className="expense-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Expense Name"
          className={errors.title ? "input-error" : ""}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-label="Expense Amount"
          className={errors.amount ? "input-error" : ""}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Expense Category"
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Health</option>
          <option>Other</option>
        </select>
        
        <div className="form-buttons">
          <button type="submit">
            Add Expense
          </button>

          <button
            type="button"
            onClick={() => exportCSV(expenses)}
          >
            Export CSV
          </button>

          <button
            type="button"
            onClick={async () => {
              await exportPDF(expenses);
            }}
          >
            Export PDF
          </button>

          <button
            type="button"
            className="danger-btn"
            onClick={clearAllExpenses}
          >
            Clear All
          </button>

        </div>

      </form>

      {errors.title && (
        <p className="form-error">{errors.title}</p>
      )}

      {errors.amount && (
        <p className="form-error">{errors.amount}</p>
      )}
    </section>
  );
}

export default ExpenseForm;