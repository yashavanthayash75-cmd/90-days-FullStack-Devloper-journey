
let transactionInput = document.getElementById("transaction");
let amountInput = document.getElementById("amount");
let transactionType = document.getElementById("transactionType");
let addTransactionBtn = document.getElementById("addTransactionBtn");

let balance = document.getElementById("balance");
let income = document.getElementById("income");
let expenses = document.getElementById("expenses");
let transactionHistory = document.getElementById("transactionHistory");

let totalIncome = 0;
let totalExpenses = 0;

let transactions = [];

addTransactionBtn.addEventListener("click", function () {

    let name = transactionInput.value.trim();
    let amount = Number(amountInput.value);
    let type = transactionType.value;

    if (name === "" || amount <= 0 || !Number.isFinite(amount)) {
        alert("Please enter a valid transaction name and amount!");
        return;
    }

    let transaction = {
        name: name,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    if (type === "income") {
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }

    updateDisplay();

    transactionInput.value = "";
    amountInput.value = "";
});

function updateDisplay() {

    let remainingBalance = totalIncome - totalExpenses;

    balance.textContent = "Remaining Balance: ₹" + remainingBalance.toFixed(2);

    income.textContent = "Income: ₹" + totalIncome.toFixed(2);

    expenses.textContent = "Expenses: ₹" + totalExpenses.toFixed(2);

    transactionHistory.innerHTML = "";

    transactions.forEach(function (item, index) {

        let li = document.createElement("li");

        li.textContent =
            item.name + " - ₹" + item.amount.toFixed(2) +
            " (" + item.type + ") ";

        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {

            if (item.type === "income") {
                totalIncome -= item.amount;
            } else {
                totalExpenses -= item.amount;
            }

            transactions.splice(index, 1);

            updateDisplay();
        });

        li.appendChild(deleteBtn);

        transactionHistory.appendChild(li);
    });
}

updateDisplay();
