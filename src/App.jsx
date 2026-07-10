import {
  useEffect,
  useMemo,
  useState,
  lazy,
  Suspense,
} from "react";

import "./App.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Summary from "./components/Summary";
import ExpenseForm from "./components/ExpenseForm";
import SearchBar from "./components/SearchBar";
import ExpenseList from "./components/ExpenseList";

// Lazy-loaded components
const Analytics = lazy(() =>
  import("./components/Analytics")
);

const DashboardInsights = lazy(() =>
  import("./components/DashboardInsights")
);

const ExpenseChart = lazy(() =>
  import("./components/ExpenseChart")
);

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
  const [categoryFilter, setCategoryFilter] =
    useState("All");

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    let filtered = [...expenses].filter((expense) =>
      expense.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (expense) =>
          expense.category === categoryFilter
      );
    }

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
  }, [
    expenses,
    search,
    sortBy,
    categoryFilter,
  ]);

  function clearAllExpenses() {
    if (expenses.length === 0) {
      toast.warning(
        "There are no expenses to clear."
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all expenses? This action cannot be undone."
    );

    if (!confirmed) return;

    setExpenses([]);

    toast.success("All expenses cleared.");
  }

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

        <Suspense fallback={null}>
          <Analytics expenses={expenses} />
        </Suspense>

        <Suspense fallback={null}>
          <DashboardInsights
            expenses={expenses}
          />
        </Suspense>

        <Suspense fallback={null}>
          <ExpenseChart
            expenses={expenses}
          />
        </Suspense>

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
          setCategoryFilter={
            setCategoryFilter
          }
        />

        <ExpenseList
          expenses={filteredExpenses}
          totalExpenses={expenses.length}
          setExpenses={setExpenses}
        />
      </main>

      <footer className="footer">
        © 2026 Expense Tracker • Built with React &
        Vite
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