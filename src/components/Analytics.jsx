function Analytics({ expenses }) {
  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((expense) => expense.amount))
      : 0;

  const lowestExpense =
    expenses.length > 0
      ? Math.min(...expenses.map((expense) => expense.amount))
      : 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTotal = expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

  return (
    <section className="analytics">

      <div className="analytics-card">
        <h3>Highest Expense</h3>
        <p>₹{highestExpense.toLocaleString("en-IN")}</p>
      </div>

      <div className="analytics-card">
        <h3>Lowest Expense</h3>
        <p>₹{lowestExpense.toLocaleString("en-IN")}</p>
      </div>

      <div className="analytics-card">
        <h3>This Month</h3>
        <p>₹{monthlyTotal.toLocaleString("en-IN")}</p>
      </div>

    </section>
  );
}

export default Analytics;