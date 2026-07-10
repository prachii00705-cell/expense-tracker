import { useState } from "react";
import "./App.css";

import Summary from "./components/Summary";
import ExpenseForm from "./components/ExpenseForm";
import SearchBar from "./components/SearchBar";
import ExpenseList from "./components/ExpenseList";

function App() {

  const [expenses, setExpenses] = useState([]);

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

        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
        />

        <SearchBar />

        <ExpenseList
          expenses={expenses}
          setExpenses={setExpenses}
        />

      </main>

      <footer className="footer">

        © 2026 Expense Tracker • Built with React & Vite

      </footer>

    </div>

  );

}

export default App;