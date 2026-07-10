import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { toast } from "react-toastify";

import Summary from "./components/Summary";
import Analytics from "./components/Analytics";
import ExpenseForm from "./components/ExpenseForm";
import SearchBar from "./components/SearchBar";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [categoryFilter, setCategoryFilter] = useState("All");
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
    let filtered = [...expenses].filter((expense) =>
      expense.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (expense) => expense.category === categoryFilter
      );
    }

    switch (sortBy) {
      case "oldest":
        filtered.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
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
          (a, b) => new Date(b.date) - new Date(a.date)
        );
    }

    return filtered;
  }, [expenses, search, sortBy, categoryFilter]);

  function clearAllExpenses() {
    if (expenses.length === 0) {
      toast.warning("There are no expenses to clear.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all expenses? This action cannot be undone."
    );

    if (!confirmed) return;

    setExpenses([]);

    toast.success("All expenses cleared.");

    console.log(
      "[Analytics] User cleared all expenses"
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Expense Tracker</h1>

          <p>
            Track and manage your expenses efficiently.
          </p>
        </div>
      </header>

      <main className="container">

        <Summary expenses={expenses} />

        <Analytics expenses={expenses} />

        <ExpenseChart expenses={expenses} />

        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
          clearAllExpenses={clearAllExpenses}
        />

        <SearchBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Loading expenses...</p>
          </div>
        ) : (
          <ExpenseList
            expenses={filteredExpenses}
            totalExpenses={expenses.length}
            setExpenses={setExpenses}
          />
        )}

      </main>

      <footer className="footer">
        © 2026 Expense Tracker • Built with React & Vite
      </footer>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />

    </div>
  );
}

export default App;