import ExpenseRow from "./ExpenseRow";

function ExpenseList({
  expenses,
  totalExpenses,
  setExpenses,
}) {

  if (totalExpenses === 0) {
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

  if (expenses.length === 0) {
    return (
      <section className="expense-list">

        <div className="empty-state">

          <div className="empty-icon">🔍</div>

          <h2>No Expenses Found</h2>

          <p>
            No expenses match your search or selected category.
            Try changing your search keyword or category filter.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="expense-list">

      <div className="table-container">

        <table className="expense-table">

          <thead>

            <tr>
              <th>Date</th>
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

      </div>

    </section>
  );
}

export default ExpenseList;