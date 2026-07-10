import { useState } from "react";

function ExpenseRow({ expense, expenses, setExpenses }) {
  const [isEditing, setIsEditing] = useState(false);

  const [editedExpense, setEditedExpense] = useState({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
  });

  function saveEdit() {
    if (
      editedExpense.title.trim() === "" ||
      editedExpense.amount === ""
    ) {
      return;
    }

    const updatedExpenses = expenses.map((item) =>
      item.id === expense.id
        ? {
            ...item,
            title: editedExpense.title.trim(),
            amount: Number(editedExpense.amount),
            category: editedExpense.category,
          }
        : item
    );

    setExpenses(updatedExpenses);

    console.log(
      "[Analytics] User interacted with React Expense Tracker"
    );

    setIsEditing(false);
  }

  function deleteExpense(id) {
    if (!window.confirm("Delete this expense?")) return;

    const updatedExpenses = expenses.filter(
      (item) => item.id !== id
    );

    setExpenses(updatedExpenses);

    console.log(
      "[Analytics] User interacted with React Expense Tracker"
    );
  }

  return (
    <tr>
      <td>
        {new Date(expense.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </td>

      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedExpense.title}
            onChange={(e) =>
              setEditedExpense({
                ...editedExpense,
                title: e.target.value,
              })
            }
          />
        ) : (
          expense.title
        )}
      </td>

      <td>
        {isEditing ? (
          <select
            value={editedExpense.category}
            onChange={(e) =>
              setEditedExpense({
                ...editedExpense,
                category: e.target.value,
              })
            }
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Health</option>
            <option>Other</option>
          </select>
        ) : (
          <span
            className={`badge ${expense.category.toLowerCase()}`}
          >
            {expense.category}
          </span>
        )}
      </td>

      <td>
        {isEditing ? (
          <input
            type="number"
            value={editedExpense.amount}
            onChange={(e) =>
              setEditedExpense({
                ...editedExpense,
                amount: e.target.value,
              })
            }
          />
        ) : (
          <>₹{expense.amount}</>
        )}
      </td>

      <td className="action-buttons">
        {isEditing ? (
          <>
            <button onClick={saveEdit}>
              Save
            </button>

            <button
              onClick={() => {
                setEditedExpense({
                  title: expense.title,
                  amount: expense.amount,
                  category: expense.category,
                });

                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}

        <button onClick={() => deleteExpense(expense.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ExpenseRow;