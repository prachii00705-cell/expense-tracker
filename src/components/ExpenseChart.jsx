import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseChart({ expenses }) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      expense.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        label: "Expenses",

        data: Object.values(categoryTotals),

        backgroundColor: [
            "#2563eb",
            "#10b981",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6",
            "#06b6d4",
            ],

        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="chart-card">

      <h2>Expense by Category</h2>

      {expenses.length === 0 ? (
        <p>No expense data available.</p>
      ) : (
        <Pie data={data} />
      )}

    </section>
  );
}

export default ExpenseChart;