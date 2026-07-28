// archive.html
// ======================================
// Finance Pro
// archive.js
// ======================================

const archiveList = document.getElementById("archiveList");

// Load Archives
document.addEventListener("DOMContentLoaded", loadArchive);

// ===============================
// Load Archive
// ===============================

function loadArchive() {

    const archives = getArchive();

    if (archives.length === 0) {

        archiveList.innerHTML = `
            <div class="empty">

                <span class="material-icons">
                    archive
                </span>

                <p>No Archive Found</p>

            </div>
        `;

        return;

    }

    archiveList.innerHTML = "";

    archives.reverse().forEach((item, index) => {

        archiveList.innerHTML += `

        <div class="transactionItem">

            <div class="left">

                <h4>${item.name}</h4>

                <small>

                    Saved : ${item.date}

                    <br>

                    Income : ${money(item.totalIncome)}

                    <br>

                    Expense : ${money(item.totalExpense)}

                    <br>

                    Balance : ${money(item.balance)}

                    <br>

                    Transactions : ${item.transactions}

                </small>

            </div>

            <div style="display:flex;flex-direction:column;gap:10px;">

                <button
                    class="btn historyBtn"
                    onclick="viewArchive(${item.id})">

                    Open

                </button>

                <button
                    class="deleteBtn"
                    onclick="deleteArchive(${item.id})">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}

// ===============================
// Open Archive
// ===============================

function viewArchive(id){

    localStorage.setItem("selected_archive", id);

    window.location.href = "archive-details.html";

}

// ===============================
// Delete Archive
// ===============================

function deleteArchive(id){

    if(!confirm("Delete this archive?")) return;

    let archives = getArchive();

    archives = archives.filter(item => item.id !== id);

    saveArchive(archives);

    loadArchive();

}
