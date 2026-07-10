function Analytics({ expenses }) {
  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const highest =
    expenses.length > 0
      ? Math.max(...expenses.map((e) => e.amount))
      : 0;

  const average =
    expenses.length > 0
      ? (total / expenses.length).toFixed(2)
      : 0;

  return (
    <section className="analytics">
      <div className="analytics-card">
        <h3>Total Spent</h3>
        <p>₹{total}</p>
      </div>

      <div className="analytics-card">
        <h3>Highest Expense</h3>
        <p>₹{highest}</p>
      </div>

      <div className="analytics-card">
        <h3>Average Expense</h3>
        <p>₹{average}</p>
      </div>
    </section>
  );
}

export default Analytics;