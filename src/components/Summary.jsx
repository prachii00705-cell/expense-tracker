function Summary({ expenses }) {

  const total = expenses.reduce(

    (sum, expense) => sum + expense.amount,

    0

  );

  const categories = new Set(

    expenses.map(

      (expense) => expense.category

    )

  ).size;

  return (

    <section className="summary">

      <div className="summary-card">

        <h3>Total Expense</h3>

        <p>₹{total}</p>

      </div>

      <div className="summary-card">

        <h3>Transactions</h3>

        <p>{expenses.length}</p>

      </div>

      <div className="summary-card">

        <h3>Categories</h3>

        <p>{categories}</p>

      </div>

    </section>

  );

}

export default Summary;