// ======================================
// Finance Pro
// archive-details.js
// ======================================

// Elements
const archiveName = document.getElementById("archiveName");
const archiveDate = document.getElementById("archiveDate");

const archiveNamePrint = document.getElementById("archiveNamePrint");
const archiveDatePrint = document.getElementById("archiveDatePrint");

const incomeTotal = document.getElementById("incomeTotal");
const expenseTotal = document.getElementById("expenseTotal");
const balanceTotal = document.getElementById("balanceTotal");
const transactionTotal = document.getElementById("transactionTotal");

const archiveTransactions =
document.getElementById("archiveTransactions");

// ======================================
// Load Archive
// ======================================

document.addEventListener("DOMContentLoaded", loadArchiveDetails);

function loadArchiveDetails(){

    const id = Number(localStorage.getItem("selected_archive"));

    const archives = getArchive();

    const archive = archives.find(item => item.id == id);

    if(!archive){

        archiveTransactions.innerHTML = `

        <div class="empty">

            <span class="material-icons">
                error
            </span>

            <p>Archive Not Found</p>

        </div>

        `;

        return;

    }

    // ===============================
    // Summary
    // ===============================

    archiveName.textContent = archive.name;
    archiveDate.textContent = archive.date;

    archiveNamePrint.textContent = archive.name;
    archiveDatePrint.textContent = archive.date;

    incomeTotal.textContent = money(archive.totalIncome);

    expenseTotal.textContent = money(archive.totalExpense);

    balanceTotal.textContent = money(archive.balance);

    transactionTotal.textContent = archive.transactions;

    // ===============================
    // Transactions
    // ===============================

    archiveTransactions.innerHTML = "";

    const all = [

        ...archive.income.map(item=>({

            ...item,

            type:"income"

        })),

        ...archive.expense.map(item=>({

            ...item,

            type:"expense"

        }))

    ];

    if(all.length===0){

        archiveTransactions.innerHTML = `

        <div class="empty">

            <span class="material-icons">
                history
            </span>

            <p>No Transactions</p>

        </div>

        `;

        return;

    }

    all.reverse();

    all.forEach(item=>{

        const color =
        item.type==="income"
        ? "in"
        : "out";

        const sign =
        item.type==="income"
        ? "+"
        : "-";

        archiveTransactions.innerHTML += `

        <div class="transactionItem">

            <div class="left">

                <h4>${item.title}</h4>

                <small>

                    Category : ${item.category}

                    <br>

                    Date : ${item.date}

                    <br>

                    Note : ${item.note || "-"}

                </small>

            </div>

            <div class="amount ${color}">

                ${sign}${money(item.amount)}

            </div>

        </div>

        `;

    });

}

// ======================================
// Print Report
// ======================================

const printBtn = document.getElementById("printReportBtn");

if(printBtn){

    printBtn.addEventListener("click",function(){

        window.print();

    });

}
