// ================================
// Finance Pro - Expense
// expense.js
// ================================

const expenseForm = document.getElementById("expenseForm");
const amount = document.getElementById("amount");
const item = document.getElementById("item");
const category = document.getElementById("category");
const date = document.getElementById("date");
const note = document.getElementById("note");

// Set Today's Date
date.value = new Date().toISOString().split("T")[0];

// ================================
// Save Expense
// ================================

expenseForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Validation

    if (
        amount.value.trim() === "" ||
        item.value.trim() === "" ||
        category.value.trim() === "" ||
        date.value.trim() === ""
    ) {

        alert("Please fill all required fields.");
        return;

    }

    // Expense Object

    const expense = {

        id: Date.now(),

        title: item.value,

        item: item.value,

        category: category.value,

        amount: Number(amount.value),

        date: date.value,

        note: note.value

    };

    // Save

    addExpense(expense);

    alert("✅ Expense Saved Successfully!");

    // Reset Form

    expenseForm.reset();

    date.value = new Date().toISOString().split("T")[0];

    // Back to Dashboard

    window.location.href = "money.html";

});

// ================================
// Preview Remaining Balance
// ================================

amount.addEventListener("input", () => {

    const currentBalance = remainingBalance();

    const enteredAmount = Number(amount.value) || 0;

    const afterExpense = currentBalance - enteredAmount;

    console.log("Current Balance :", money(currentBalance));
    console.log("Remaining After Expense :", money(afterExpense));

});

// ================================
// Prevent Negative Amount
// ================================

amount.addEventListener("keydown", (e) => {

    if (e.key === "-") {

        e.preventDefault();

    }

});
