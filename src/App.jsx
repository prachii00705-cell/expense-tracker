import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Summary from "./components/Summary";
import ExpenseForm from "./components/ExpenseForm";
import SearchBar from "./components/SearchBar";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem("expenses");
      return savedExpenses ? JSON.parse(savedExpenses) : [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const filteredExpenses = useMemo(() => {
    const filtered = expenses.filter((expense) =>
      expense.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    switch (sortBy) {
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.date) - new Date(b.date)
        );
        break;

      case "highest":
        filtered.sort(
          (a, b) => b.amount - a.amount
        );
        break;

      case "lowest":
        filtered.sort(
          (a, b) => a.amount - b.amount
        );
        break;

      default:
        filtered.sort(
          (a, b) =>
            new Date(b.date) - new Date(a.date)
        );
    }

    return filtered;
  }, [expenses, search, sortBy]);

  return (
    <div className="app">

      <header className="header">
        <div className="container">
          <h1>Expense Tracker</h1>

          <p>
            Track and manage your expenses
            efficiently.
          </p>
        </div>
      </header>

      <main className="container">

        <Summary expenses={expenses} />

        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
        />

        <SearchBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Loading expenses...</p>
          </div>
        ) : (
          <ExpenseList
            expenses={filteredExpenses}
            setExpenses={setExpenses}
          />
        )}

      </main>

      <footer className="footer">
        © 2026 Expense Tracker • Built with React &
        Vite
      </footer>

    </div>
  );
}

export default App;