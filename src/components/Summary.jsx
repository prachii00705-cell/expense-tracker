function Summary({ expenses }) {
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const totalTransactions = expenses.length;

  const averageExpense =
    totalTransactions === 0
      ? 0
      : Math.round(totalExpense / totalTransactions);

  return (
    <section className="summary">

      <div className="summary-card">

        <h3>Total Expenses</h3>

        <p>₹{totalExpense.toLocaleString("en-IN")}</p>

      </div>

      <div className="summary-card">

        <h3>Total Transactions</h3>

        <p>{totalTransactions}</p>

      </div>

      <div className="summary-card">

        <h3>Average Expense</h3>

        <p>₹{averageExpense.toLocaleString("en-IN")}</p>

      </div>

    </section>
  );
}

export default Summary;