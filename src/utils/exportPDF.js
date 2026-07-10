import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPDF(expenses) {
  if (expenses.length === 0) {
    alert("No expenses to export.");
    return;
  }

  const doc = new jsPDF();

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  doc.setFontSize(20);
  doc.text("Expense Tracker Report", 14, 20);

  doc.setFontSize(11);
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-IN")}`,
    14,
    28
  );

  autoTable(doc, {
    startY: 36,
    head: [["Date", "Expense", "Category", "Amount"]],
    body: expenses.map((expense) => [
      expense.date,
      expense.title,
      expense.category,
      `Rs. ${expense.amount}`,
    ]),
    theme: "striped",
    headStyles: {
      fillColor: [17, 24, 39],
    },
  });

  const finalY = doc.lastAutoTable.finalY || 40;

  doc.setFontSize(13);
  doc.text(
    `Total Expenses: Rs. ${total.toLocaleString("en-IN")}`,
    14,
    finalY + 12
  );

  doc.save("Expense_Report.pdf");

  console.log(
    "[Analytics] User exported expense report as PDF"
  );
}