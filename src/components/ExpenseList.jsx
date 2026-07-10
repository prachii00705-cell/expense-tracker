import ExpenseRow from "./ExpenseRow";

function ExpenseList({ expenses, setExpenses }) {
  if (expenses.length === 0) {
    return (
      <section className="expense-list">
        <div className="empty-state">
          <div className="empty-icon">💳</div>

          <h2>No Expenses Yet</h2>

          <p>
            Start tracking your spending by adding your first expense.
          </p>

          <button
            className="empty-btn"
            onClick={() =>
              document.querySelector(".expense-form input")?.focus()
            }
          >
            + Add Your First Expense
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="expense-list">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Expense</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              expenses={expenses}
              setExpenses={setExpenses}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ExpenseList;