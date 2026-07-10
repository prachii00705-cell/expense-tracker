export async function exportPDF(expenses) {
  if (expenses.length === 0) {
    alert("No expenses to export.");
    return;
  }

  // Lazy-load heavy libraries only when needed
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF();

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  // Report Title
  doc.setFontSize(20);
  doc.text("Expense Tracker Report", 14, 20);

  // Report Date
  doc.setFontSize(11);
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-IN")}`,
    14,
    28
  );

  // Expense Table
  autoTable(doc, {
    startY: 36,
    head: [["Date", "Expense", "Category", "Amount"]],
    body: expenses.map((expense) => [
      expense.date,
      expense.title,
      expense.category,
      `₹${Number(expense.amount).toLocaleString("en-IN")}`,
    ]),
    theme: "striped",
    headStyles: {
      fillColor: [17, 24, 39],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
  });

  // Total
  const finalY = doc.lastAutoTable.finalY || 40;

  doc.setFontSize(13);
  doc.setFont(undefined, "bold");
  doc.text(
    `Total Expenses: ₹${total.toLocaleString("en-IN")}`,
    14,
    finalY + 12
  );

  // Save PDF
  doc.save("Expense_Report.pdf");
}