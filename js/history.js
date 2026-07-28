// =======================================
// Finance Pro - History
// history.js
// =======================================

const historyList = document.getElementById("historyList");
const searchBox = document.getElementById("searchBox");

// Load Page
document.addEventListener("DOMContentLoaded", () => {

    loadSummary();
    loadHistory();

});

// =============================
// Summary Cards
// =============================

function loadSummary() {

    document.getElementById("historyIncome").textContent =
        money(totalIncome());

    document.getElementById("historyExpense").textContent =
        money(totalExpense());

    document.getElementById("historyBalance").textContent =
        money(remainingBalance());

}

// =============================
// Load History
// =============================

function loadHistory(search = "") {

    let data = allTransactions();

    // Latest First
    data.reverse();

    // Search
    if (search !== "") {

        search = search.toLowerCase();

        data = data.filter(item => {

            return (
                (item.title || "").toLowerCase().includes(search) ||
                (item.category || "").toLowerCase().includes(search) ||
                (item.date || "").includes(search)
            );

        });

    }

    // Empty

    if (data.length === 0) {

        historyList.innerHTML = `

        <div class="empty">

            <span class="material-icons">
                history
            </span>

            <p>No Transaction Found</p>

        </div>

        `;

        return;

    }

    historyList.innerHTML = "";

    data.forEach((item,index)=>{

        const color =
            item.type === "income" ? "in" : "out";

        const sign =
            item.type === "income" ? "+" : "-";

        historyList.innerHTML += `

        <div class="transactionItem">

            <div class="left">

                <h4>${item.title}</h4>

                <small>

                    ${item.category}

                    <br>

                    ${item.date}

                </small>

            </div>

            <div style="text-align:right;">

                <div class="amount ${color}">
                    ${sign}${money(item.amount)}
                </div>

            <button
    class="deleteBtn"
    onclick="deleteTransaction('${item.type}', ${item.originalIndex})">
    <span class="material-icons" style="font-size:18px;vertical-align:middle;">
        delete
    </span>
    Delete
</button>
            </div>

        </div>

        `;

    });

}

// =============================
// Search
// =============================

searchBox.addEventListener("keyup", function(){

    loadHistory(this.value);

});

// =============================
// Delete
// =============================

function deleteTransaction(type,index){

    const ok = confirm("Delete this transaction?");

    if(!ok) return;

    if(type==="income"){

        deleteIncome(index);

    }else{

        deleteExpense(index);

    }

    loadSummary();

    loadHistory(searchBox.value);

}
