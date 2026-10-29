let expenseName = document.getElementById("expenseName");
let expenseAmount = document.getElementById("expenseAmount");
let addExpenseBtn = document.getElementById("addExpenseBtn");
let expenseList = document.getElementById("expenseList");
let totalAmount = document.getElementById("totalAmount");
let expenseCount = document.getElementById("expenseCount");
let emptyMessage = document.getElementById("emptyMessage");
let message = document.getElementById("message");
let clearAllBtn = document.getElementById("clearAllBtn");

let expenses = [];

try {
    let savedExpenses = JSON.parse(
        localStorage.getItem("day55Expenses")
    );

    if (Array.isArray(savedExpenses)) {
        expenses = savedExpenses.filter(function(expense) {
            return (
                expense &&
                typeof expense.name === "string" &&
                expense.name.trim() !== "" &&
                typeof expense.amount === "number" &&
                Number.isFinite(expense.amount) &&
                expense.amount > 0
            );
        });
    }
} catch (error) {
    expenses = [];
}

function formatAmount(amount) {
    return amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function saveExpenses() {
    localStorage.setItem(
        "day55Expenses",
        JSON.stringify(expenses)
    );
}

function displayExpenses() {
    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;

        let li = document.createElement("li");

        let details = document.createElement("div");
        details.className = "expense-details";

        let name = document.createElement("strong");
        name.textContent = expense.name;

        let amount = document.createElement("span");
        amount.textContent = "₹" + formatAmount(expense.amount);

        details.appendChild(name);
        details.appendChild(amount);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";
        deleteBtn.setAttribute(
            "aria-label",
            "Delete expense: " + expense.name
        );

        deleteBtn.addEventListener("click", function() {
            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });

            saveExpenses();
            displayExpenses();

            message.textContent = "Expense deleted successfully!";
        });

        li.appendChild(details);
        li.appendChild(deleteBtn);

        expenseList.appendChild(li);
    });

    totalAmount.textContent = "₹" + formatAmount(total);

    expenseCount.textContent =
        expenses.length +
        (expenses.length === 1
            ? " expense recorded"
            : " expenses recorded");

    emptyMessage.style.display =
        expenses.length === 0 ? "block" : "none";

    clearAllBtn.style.display =
        expenses.length === 0 ? "none" : "block";
}

addExpenseBtn.addEventListener("click", function() {
    let name = expenseName.value.trim();
    let amountText = expenseAmount.value.trim();
    let amount = Number(amountText);

    if (name === "") {
        message.textContent = "Please enter an expense name.";
        expenseName.focus();
        return;
    }

    if (
        amountText === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        message.textContent =
            "Please enter an amount greater than zero.";
        expenseAmount.focus();
        return;
    }

    let newExpense = {
        id: Date.now() + "-" + Math.random().toString(36).slice(2),
        name: name,
        amount: amount
    };

    expenses.push(newExpense);

    saveExpenses();
    displayExpenses();

    expenseName.value = "";
    expenseAmount.value = "";
    expenseName.focus();

    message.textContent = "Expense added successfully!";
});

expenseAmount.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addExpenseBtn.click();
    }
});

expenseName.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        expenseAmount.focus();
    }
});

clearAllBtn.addEventListener("click", function() {
    if (expenses.length === 0) {
        return;
    }

    let confirmed = confirm(
        "Are you sure you want to delete all expenses?"
    );

    if (confirmed) {
        expenses = [];

        saveExpenses();
        displayExpenses();

        message.textContent = "All expenses cleared!";
    }
});

displayExpenses();