function DashboardInsights({ expenses }) {
  if (expenses.length === 0) return null;

  const highestExpense = expenses.reduce(
    (max, expense) =>
      expense.amount > max.amount ? expense : max,
    expenses[0]
  );

  const categoryCount = {};

  expenses.forEach((expense) => {
    categoryCount[expense.category] =
      (categoryCount[expense.category] || 0) + 1;
  });

  const mostUsedCategory = Object.keys(categoryCount).reduce(
    (a, b) =>
      categoryCount[a] > categoryCount[b] ? a : b
  );

  const latestExpense =
    expenses[expenses.length - 1];

  return (
    <section className="dashboard-insights">

      <h2>Dashboard Insights</h2>

      <div className="insight-grid">

        <div className="insight-card">
          <h4>Highest Expense</h4>
          <p>Rs. {highestExpense.amount}</p>
        </div>

        <div className="insight-card">
          <h4>Most Used Category</h4>
          <p>{mostUsedCategory}</p>
        </div>

        <div className="insight-card">
          <h4>Latest Expense</h4>
          <p>{latestExpense.title}</p>
        </div>

        <div className="insight-card">
          <h4>Total Categories</h4>
          <p>{Object.keys(categoryCount).length}</p>
        </div>

      </div>

    </section>
  );
}

export default DashboardInsights;