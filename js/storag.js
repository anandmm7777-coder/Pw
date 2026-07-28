// ===============================
// Finance Pro - Local Storage
// storage.js
// ===============================

// Storage Keys
const INCOME_KEY = "finance_income";
const EXPENSE_KEY = "finance_expense";
const ARCHIVE_KEY = "finance_archive";
// ---------- Load Data ----------

function getIncome() {
    return JSON.parse(localStorage.getItem(INCOME_KEY)) || [];
}

function getExpense() {
    return JSON.parse(localStorage.getItem(EXPENSE_KEY)) || [];
}

// ---------- Save Data ----------

function saveIncome(data) {
    localStorage.setItem(INCOME_KEY, JSON.stringify(data));
}

function saveExpense(data) {
    localStorage.setItem(EXPENSE_KEY, JSON.stringify(data));
}

// ---------- Add Income ----------

function addIncome(item) {

    const income = getIncome();

    income.push(item);

    saveIncome(income);

}

// ---------- Add Expense ----------

function addExpense(item) {

    const expense = getExpense();

    expense.push(item);

    saveExpense(expense);

}

// ---------- Delete ----------

function deleteIncome(index) {

    const income = getIncome();

    income.splice(index,1);

    saveIncome(income);

}

function deleteExpense(index) {

    const expense = getExpense();

    expense.splice(index,1);

    saveExpense(expense);

}

// ---------- Total Income ----------

function totalIncome() {

    const income = getIncome();

    return income.reduce((total,item)=>{

        return total + Number(item.amount);

    },0);

}

// ---------- Total Expense ----------

function totalExpense() {

    const expense = getExpense();

    return expense.reduce((total,item)=>{

        return total + Number(item.amount);

    },0);

}

// ---------- Remaining Balance ----------

function remainingBalance() {

    return totalIncome() - totalExpense();

}

// ---------- Total Transactions ----------

function transactionCount() {

    return getIncome().length + getExpense().length;

}

// ---------- Combined Transactions ----------

function allTransactions() {

    const income = getIncome().map((item, index) => ({

        ...item,

        type: "income",

        originalIndex: index

    }));

    const expense = getExpense().map((item, index) => ({

        ...item,

        type: "expense",

        originalIndex: index

    }));

    return [...income, ...expense];

}

// ---------- Clear All ----------

function clearFinanceData(){

    localStorage.removeItem(INCOME_KEY);

    localStorage.removeItem(EXPENSE_KEY);

}

// ---------- Currency ----------

function money(value){

    return "₹" + Number(value).toLocaleString("en-IN");

}
// =====================================
// Archive Functions
// =====================================

// Get Archive

function getArchive(){

    return JSON.parse(
        localStorage.getItem(ARCHIVE_KEY)
    ) || [];

}

// Save Archive

function saveArchive(data){

    localStorage.setItem(
        ARCHIVE_KEY,
        JSON.stringify(data)
    );

}

// Create Archive

function createArchive(name){

    const archive = getArchive();

    const data = {

        id:Date.now(),

        name:name,

        date:new Date().toLocaleString(),

        totalIncome:totalIncome(),

        totalExpense:totalExpense(),

        balance:remainingBalance(),

        transactions:transactionCount(),

        income:getIncome(),

        expense:getExpense()

    };

    archive.push(data);

    saveArchive(archive);

}

// Clear Current Month

function resetCurrentMonth(){

    saveIncome([]);

    saveExpense([]);

}