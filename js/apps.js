// ================================
// Finance Pro Dashboard
// app.js
// ================================

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();

});

// ================================
// Load Dashboard
// ================================

function loadDashboard() {

    document.getElementById("totalIncome").textContent =
        money(totalIncome());

    document.getElementById("totalExpense").textContent =
        money(totalExpense());

    document.getElementById("remainingBalance").textContent =
        money(remainingBalance());

    document.getElementById("transactionCount").textContent =
        transactionCount();

    loadTransactions();

}

// ================================
// Recent Transactions
// ================================

function loadTransactions() {

    const list = document.getElementById("transactionList");

    if (!list) return;

    const data = allTransactions();

    // Latest first
    data.reverse();

    if (data.length === 0) {

        list.innerHTML = `
            <div class="empty">
                <span class="material-icons">receipt_long</span>
                <p>No Transactions Yet</p>
            </div>
        `;

        return;
    }

    list.innerHTML = "";

    data.slice(0, 10).forEach(item => {

        const div = document.createElement("div");

        div.className = "transactionItem";

        const amountClass =
            item.type === "income" ? "in" : "out";

        const sign =
            item.type === "income" ? "+" : "-";

        div.innerHTML = `

            <div class="left">

                <h4>${item.title || item.source || "Transaction"}</h4>

                <small>
                    ${item.category || item.type}
                    •
                    ${item.date || ""}
                </small>

            </div>

            <div class="amount ${amountClass}">
                ${sign}${money(item.amount)}
            </div>

        `;

        list.appendChild(div);

    });

}

// ================================
// Refresh Dashboard
// ================================

function refreshDashboard() {

    loadDashboard();

}

// ================================
// Greeting (Optional)
// ================================

const hour = new Date().getHours();

let greeting = "";

if (hour < 12) {

    greeting = "Good Morning ☀️";

} else if (hour < 17) {

    greeting = "Good Afternoon 🌤️";

} else {

    greeting = "Good Evening 🌙";

}

console.log(greeting);

// ================================
// Finance Summary
// ================================

console.log("Income :", money(totalIncome()));
console.log("Expense :", money(totalExpense()));
console.log("Balance :", money(remainingBalance()));
console.log("Transactions :", transactionCount());
