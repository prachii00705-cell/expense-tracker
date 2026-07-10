function Summary({ expenses }) {
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const totalTransactions = expenses.length;

  const totalCategories = new Set(
    expenses.map((expense) => expense.category)
  ).size;

  return (
    <section className="summary">

      <div className="summary-card">
        <h2>Total Expenses</h2>
        <p>₹{totalExpense.toLocaleString("en-IN")}</p>
      </div>

      <div className="summary-card">
        <h2>Transactions</h2>
        <p>{totalTransactions}</p>
      </div>

      <div className="summary-card">
        <h2>Categories</h2>
        <p>{totalCategories}</p>
      </div>

    </section>
  );
}

export default Summary;