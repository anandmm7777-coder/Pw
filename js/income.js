// ================================
// Finance Pro - Income
// income.js
// ================================

const incomeForm = document.getElementById("incomeForm");
const amount = document.getElementById("amount");
const source = document.getElementById("source");
const date = document.getElementById("date");
const note = document.getElementById("note");

// Today's date by default
date.value = new Date().toISOString().split("T")[0];

// ================================
// Save Income
// ================================

incomeForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Validation

    if (
        amount.value.trim() === "" ||
        source.value.trim() === "" ||
        date.value.trim() === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    // Income Object

    const income = {

        id: Date.now(),

        title: source.value,

        source: source.value,

        amount: Number(amount.value),

        category: "Income",

        date: date.value,

        note: note.value

    };

    // Save

    addIncome(income);

    alert("✅ Income Saved Successfully!");

    // Reset Form

    incomeForm.reset();

    date.value = new Date().toISOString().split("T")[0];

    // Redirect Dashboard

    window.location.href = "money.html";

});
