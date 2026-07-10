export function exportCSV(expenses) {
  if (expenses.length === 0) {
    alert("No expenses to export.");
    return;
  }

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const headers = [
    "Date",
    "Expense",
    "Category",
    "Amount (INR)",
  ];

  const rows = expenses.map((expense) => [
    expense.date,
    expense.title,
    expense.category,
    expense.amount,
  ]);

  rows.push([]);
  rows.push(["Report Summary"]);
  rows.push(["Total Transactions", expenses.length]);
  rows.push([
    "Total Expense (INR)",
    totalExpense.toLocaleString("en-IN"),
  ]);
  rows.push([
    "Generated On",
    new Date().toLocaleDateString("en-IN"),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Expense_Report.csv";
  link.click();

  console.log(
    "[Analytics] User exported expense report as CSV"
  );
}