let expenses = [];
let totalBudget = 0;

document.getElementById("setBudget").addEventListener("click", () => {
    totalBudget = parseFloat(document.getElementById("budget").value);
});

document.getElementById("addExpense").addEventListener("click", () => {
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (!category || isNaN(amount) || !date) {
        alert("Please fill in all fields");
        return;
    }

    expenses.push({ category, amount, date });
    updateExpenseTable();
    updateBalanceAlert();
});

function updateExpenseTable() {
    const tableBody = document.getElementById("expenseTable");
    tableBody.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const row = tableBody.insertRow();

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.innerHTML = expense.category;
        cell2.innerHTML = `Rs.${expense.amount}`;
        cell3.innerHTML = expense.date;
        cell4.innerHTML = '<button onclick="deleteExpense(' + i + ')">Delete</button>';
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenseTable();
    updateBalanceAlert();
}

function updateBalanceAlert() {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const remainingBudget = totalBudget - totalExpenses;
    const alertDiv = document.getElementById("budgetAlert");

    if (remainingBudget < 0.7 * totalBudget) {
        alertDiv.textContent = "Warning: You have used your 70% of budget!";
    } else {
        alertDiv.textContent = "";
    }
}