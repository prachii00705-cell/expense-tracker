import { useState } from "react";

function ExpenseForm({ expenses, setExpenses }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(event) {

    event.preventDefault();

    if (
      title.trim() === "" ||
      amount === "" ||
      category === ""
    ) {
      return;
    }

    const newExpense = {

      id: Date.now(),

      title: title.trim(),

      amount: Number(amount),

      category

    };

    setExpenses([...expenses, newExpense]);

    console.log(
      "[Analytics] User interacted with React Expense Tracker"
    );

    setTitle("");
    setAmount("");
    setCategory("");

  }

  return (

    <section className="expense-form">

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          aria-label="Expense Title"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          aria-label="Expense Amount"
        />

        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          aria-label="Expense Category"
        >

          <option value="">Category</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Health</option>
          <option>Other</option>

        </select>

        <button type="submit">

          Add Expense

        </button>

      </form>

    </section>

  );

}

export default ExpenseForm;