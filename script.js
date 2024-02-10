document.addEventListener("DOMContentLoaded", function () {
    loadTransactions();
});

function addTransaction() {
    const type = document.getElementById("type").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const transaction = {
        type,
        amount,
        date: new Date().toLocaleString(),
    };

    const transactions = getTransactions();
    transactions.push(transaction);
    saveTransactions(transactions);
    updateTransactionList(transactions);
}

function getTransactions() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
}

function saveTransactions(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateTransactionList(transactions) {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    transactions.forEach((transaction) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} - $${transaction.amount.toFixed(2)} (${transaction.date})`;
        transactionList.appendChild(listItem);
    });
}

function loadTransactions() {
    const transactions = getTransactions();
    updateTransactionList(transactions);
}