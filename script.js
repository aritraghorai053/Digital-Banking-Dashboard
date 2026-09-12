// Bank account data

let account = {
    balance: 300000,
    income: 45000,
    expenses: 22450
};


// Transactions data

let transactions = [
    {
        id: 1,
        title: "Amazon Shopping",
        category: "Shopping",
        amount: 1299,
        type: "expense",
        date: "Today, 10:32 AM"
    },
    {
        id: 2,
        title: "Dominos Pizza",
        category: "Food",
        amount: 450,
        type: "expense",
        date: "Today, 08:15 PM"
    },
    {
        id: 3,
        title: "Monthly Salary",
        category: "Income",
        amount: 30000,
        type: "income",
        date: "Sep 07, 09:00 AM"
    },
    {
        id: 4,
        title: "Uber Ride",
        category: "Transport",
        amount: 280,
        type: "expense",
        date: "Aug 30, 06:40 PM"
    },
    {
        id: 5,
        title: "Electricity Bill",
        category: "Bills",
        amount: 1650,
        type: "expense",
        date: "Aug 28, 02:15 PM"
    },
    {
        id: 6,
        title: "Transfer to Rahul",
        category: "Transfer",
        amount: 2500,
        type: "expense",
        date: "Aug 25, 11:20 AM"
    }
];


// Notifications data

let notifications = [
    "Salary of ₹30,000.00 was credited to your account.",
    "Electricity Bill of ₹1,650.00 was paid successfully.",
    "Security Alert: Login from a new Chrome browser on Windows."
];


// View all toggle state

let showAllTransactions = false;


// Check data

console.log(account);
console.log(transactions);


// Real time and date

function updateDateTime() {

    const now = new Date();

    const dateTimeElement = document.getElementById("current-date-time");
    const greetingElement = document.getElementById("greeting-text");

    // Format date and time
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const formattedDate = now.toLocaleDateString("en-US", dateOptions);
    const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    if (dateTimeElement) {
        dateTimeElement.textContent = `${formattedDate} • ${formattedTime}`;
    }

    // Set greeting based on time of day
    const hour = now.getHours();
    let greeting = "Good Evening,";

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning,";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon,";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening,";
    } else {
        greeting = "Good Night,";
    }

    if (greetingElement) {
        greetingElement.textContent = greeting;
    }

}

// Get formatted time for new transactions
function getTransactionTime() {

    const now = new Date();

    const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    return `Today, ${timeString}`;

}


// Update dashboard

function updateDashboard() {

    const balanceElement = document.getElementById("total-balance");
    const incomeElement = document.getElementById("total-income");
    const expensesElement = document.getElementById("total-expenses");
    const savingsElement = document.getElementById("total-savings");

    // Calculate savings
    const savings = account.income - account.expenses;

    // Update html
    if (balanceElement) {
        balanceElement.textContent = `₹${account.balance.toLocaleString("en-IN")}.00`;
    }

    if (incomeElement) {
        incomeElement.textContent = `₹${account.income.toLocaleString("en-IN")}.00`;
    }

    if (expensesElement) {
        expensesElement.textContent = `₹${account.expenses.toLocaleString("en-IN")}.00`;
    }

    if (savingsElement) {
        savingsElement.textContent = `₹${savings.toLocaleString("en-IN")}.00`;
    }

    // Update category list
    updateCategories();

}


// Display transactions

function displayTransactions(listToDisplay = null) {

    const transactionsList = document.getElementById("transactions-list");
    if (!transactionsList) return;

    // Clear existing transactions
    transactionsList.innerHTML = "";

    // Check list to show
    const items = listToDisplay !== null 
        ? listToDisplay 
        : (showAllTransactions ? transactions : transactions.slice(0, 5));

    // If no transactions
    if (items.length === 0) {
        transactionsList.innerHTML = `
            <div style="text-align: center; padding: 25px; color: var(--text-light); font-size: 12px;">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 20px; margin-bottom: 8px; display: block;"></i>
                No transactions found.
            </div>
        `;
        return;
    }

    // Loop through transactions
    items.forEach(function (transaction) {

        const transactionElement = document.createElement("div");
        transactionElement.classList.add("transaction");

        // Set icon
        let icon = "fa-circle";

        if (transaction.category === "Shopping") {
            icon = "fa-bag-shopping";
        } else if (transaction.category === "Food") {
            icon = "fa-utensils";
        } else if (transaction.category === "Income") {
            icon = "fa-money-bill-wave";
        } else if (transaction.category === "Transport") {
            icon = "fa-car";
        } else if (transaction.category === "Withdrawal") {
            icon = "fa-money-bill-transfer";
        } else if (transaction.category === "Transfer") {
            icon = "fa-paper-plane";
        } else if (transaction.category === "Bills") {
            icon = "fa-file-invoice";
        }

        // Set icon class
        let iconClass = "shopping";

        if (transaction.category === "Food") {
            iconClass = "food";
        } else if (transaction.category === "Income") {
            iconClass = "salary";
        } else if (transaction.category === "Transport") {
            iconClass = "transport";
        } else if (transaction.category === "Withdrawal") {
            iconClass = "withdrawal";
        } else if (transaction.category === "Transfer") {
            iconClass = "transfer";
        } else if (transaction.category === "Bills") {
            iconClass = "bills";
        }

        // Set amount class and sign
        let amountClass = "expense-amount";
        let sign = "-";

        if (transaction.type === "income") {
            amountClass = "income-amount";
            sign = "+";
        }

        transactionElement.innerHTML = `
            <div class="transaction-left">
                <div class="transaction-icon ${iconClass}">
                    <i class="fa-solid ${icon}"></i>
                </div>
                <div>
                    <h4>${transaction.title}</h4>
                    <p>${transaction.category} • ${transaction.date}</p>
                </div>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${sign}₹${transaction.amount.toLocaleString("en-IN")}.00
            </div>
        `;

        transactionsList.appendChild(transactionElement);

    });

}


// Update spending categories

function updateCategories() {

    const categoryList = document.getElementById("category-list");
    if (!categoryList) return;

    // Categories data
    const categoryConfig = {
        "Food": { icon: "fa-utensils", bgClass: "food-bg", total: 0, count: 0 },
        "Shopping": { icon: "fa-bag-shopping", bgClass: "shopping-bg", total: 0, count: 0 },
        "Transport": { icon: "fa-car", bgClass: "transport-bg", total: 0, count: 0 },
        "Bills": { icon: "fa-file-invoice", bgClass: "bills-bg", total: 0, count: 0 },
        "Others": { icon: "fa-ellipsis", bgClass: "other-bg", total: 0, count: 0 }
    };

    // Calculate totals
    transactions.forEach(function (transaction) {
        if (transaction.type === "expense") {
            const cat = transaction.category;
            if (categoryConfig[cat]) {
                categoryConfig[cat].total += transaction.amount;
                categoryConfig[cat].count += 1;
            } else {
                categoryConfig["Others"].total += transaction.amount;
                categoryConfig["Others"].count += 1;
            }
        }
    });

    // Clear category list
    categoryList.innerHTML = "";

    // Render categories
    for (const [name, data] of Object.entries(categoryConfig)) {
        const categoryItem = document.createElement("div");
        categoryItem.classList.add("category-item");

        categoryItem.innerHTML = `
            <div class="category-info">
                <div class="category-icon ${data.bgClass}">
                    <i class="fa-solid ${data.icon}"></i>
                </div>
                <div>
                    <h4>${name}</h4>
                    <p>${data.count} transaction${data.count === 1 ? "" : "s"}</p>
                </div>
            </div>
            <strong>₹${data.total.toLocaleString("en-IN")}</strong>
        `;

        categoryList.appendChild(categoryItem);
    }

}


// Spending chart

function initChart() {

    const chartFilter = document.getElementById("chart-filter");
    const bars = document.querySelectorAll(".bars .bar");

    // Chart data
    const chartData = {
        week: [35, 55, 40, 78, 62, 45, 28],
        month: [60, 45, 75, 50, 85, 40, 65],
        year: [40, 65, 80, 55, 70, 90, 50]
    };

    // Filter change
    if (chartFilter) {
        chartFilter.addEventListener("change", function () {
            const selected = chartFilter.value;
            const heights = chartData[selected] || chartData.week;

            bars.forEach(function (bar, index) {
                if (heights[index] !== undefined) {
                    bar.style.height = `${heights[index]}%`;
                }
            });
        });
    }

    // Bar click active
    bars.forEach(function (bar) {
        bar.addEventListener("click", function () {
            bars.forEach(b => b.classList.remove("active-bar"));
            bar.classList.add("active-bar");
        });
    });

}


// Deposit money

const addMoneyBtn = document.getElementById("add-money-btn");
const depositQuickBtn = document.getElementById("deposit-money-btn");
const depositModal = document.getElementById("deposit-modal");
const closeModal = document.getElementById("close-modal");
const depositForm = document.getElementById("deposit-form");
const depositAmount = document.getElementById("deposit-amount");
const depositError = document.getElementById("deposit-error");

// Open deposit modal
function openDepositModal() {
    if (depositModal) {
        depositModal.classList.add("show");
        if (depositAmount) depositAmount.focus();
    }
}

// Close deposit modal
function closeDepositModal() {
    if (depositModal) {
        depositModal.classList.remove("show");
        if (depositForm) depositForm.reset();
        if (depositError) depositError.textContent = "";
    }
}

if (addMoneyBtn) addMoneyBtn.addEventListener("click", openDepositModal);
if (depositQuickBtn) depositQuickBtn.addEventListener("click", openDepositModal);
if (closeModal) closeModal.addEventListener("click", closeDepositModal);

// Close when clicking outside
if (depositModal) {
    depositModal.addEventListener("click", function (event) {
        if (event.target === depositModal) {
            closeDepositModal();
        }
    });
}

// Deposit form submit
if (depositForm) {
    depositForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get amount
        const amount = Number(depositAmount.value);

        // Validation
        if (amount <= 0 || isNaN(amount)) {
            depositError.textContent = "Please enter a valid amount.";
            return;
        }

        // Add money to balance
        account.balance += amount;

        // Add money to income
        account.income += amount;

        // Create transaction
        const newTransaction = {
            id: Date.now(),
            title: "Money Deposit",
            category: "Income",
            amount: amount,
            type: "income",
            date: getTransactionTime()
        };

        // Add transaction to beginning
        transactions.unshift(newTransaction);

        // Update dashboard
        updateDashboard();

        // Update transactions
        displayTransactions();

        // Close modal
        closeDepositModal();

        // Show success message
        alert(`₹${amount.toLocaleString("en-IN")} deposited successfully!`);

    });
}


// Withdraw money

const withdrawMoneyBtn = document.getElementById("withdraw-money-btn");
const withdrawModal = document.getElementById("withdraw-modal");
const closeWithdrawModal = document.getElementById("close-withdraw-modal");
const withdrawForm = document.getElementById("withdraw-form");
const withdrawAmount = document.getElementById("withdraw-amount");
const withdrawError = document.getElementById("withdraw-error");

// Open withdraw modal
function openWithdrawModal() {
    if (withdrawModal) {
        withdrawModal.classList.add("show");
        if (withdrawAmount) withdrawAmount.focus();
    }
}

// Close withdraw modal
function closeWithdraw() {
    if (withdrawModal) {
        withdrawModal.classList.remove("show");
        if (withdrawForm) withdrawForm.reset();
        if (withdrawError) withdrawError.textContent = "";
    }
}

if (withdrawMoneyBtn) withdrawMoneyBtn.addEventListener("click", openWithdrawModal);
if (closeWithdrawModal) closeWithdrawModal.addEventListener("click", closeWithdraw);

// Close when clicking outside
if (withdrawModal) {
    withdrawModal.addEventListener("click", function (event) {
        if (event.target === withdrawModal) {
            closeWithdraw();
        }
    });
}

// Withdraw form submit
if (withdrawForm) {
    withdrawForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get amount
        const amount = Number(withdrawAmount.value);

        // Validation
        if (amount <= 0 || isNaN(amount)) {
            withdrawError.textContent = "Please enter a valid amount.";
            return;
        }

        // Check balance
        if (amount > account.balance) {
            withdrawError.textContent = "Insufficient balance.";
            return;
        }

        // Deduct money
        account.balance -= amount;

        // Add withdrawal to expenses
        account.expenses += amount;

        // Create transaction
        const newTransaction = {
            id: Date.now(),
            title: "Cash Withdrawal",
            category: "Withdrawal",
            amount: amount,
            type: "expense",
            date: getTransactionTime()
        };

        // Add transaction to beginning
        transactions.unshift(newTransaction);

        // Update dashboard
        updateDashboard();

        // Update transactions
        displayTransactions();

        // Close modal
        closeWithdraw();

        // Show success message
        alert(`₹${amount.toLocaleString("en-IN")} withdrawn successfully!`);

    });
}


// Transfer money

const transferMoneyBtn = document.getElementById("transfer-money-btn");
const navTransferBtn = document.getElementById("nav-transfer");
const transferModal = document.getElementById("transfer-modal");
const closeTransferModal = document.getElementById("close-transfer-modal");
const transferForm = document.getElementById("transfer-form");
const recipientName = document.getElementById("recipient-name");
const accountNumber = document.getElementById("account-number");
const transferAmount = document.getElementById("transfer-amount");
const transferError = document.getElementById("transfer-error");

// Open transfer modal
function openTransferModal(e) {
    if (e) e.preventDefault();
    if (transferModal) {
        transferModal.classList.add("show");
        if (recipientName) recipientName.focus();
    }
}

// Close transfer modal
function closeTransfer() {
    if (transferModal) {
        transferModal.classList.remove("show");
        if (transferForm) transferForm.reset();
        if (transferError) transferError.textContent = "";
    }
}

if (transferMoneyBtn) transferMoneyBtn.addEventListener("click", openTransferModal);
if (navTransferBtn) navTransferBtn.addEventListener("click", openTransferModal);
if (closeTransferModal) closeTransferModal.addEventListener("click", closeTransfer);

// Close when clicking outside
if (transferModal) {
    transferModal.addEventListener("click", function (event) {
        if (event.target === transferModal) {
            closeTransfer();
        }
    });
}

// Transfer form submit
if (transferForm) {
    transferForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get values
        const name = recipientName.value.trim();
        const accountNo = accountNumber.value.trim();
        const amount = Number(transferAmount.value);

        // Validate recipient
        if (name === "") {
            transferError.textContent = "Please enter recipient name.";
            return;
        }

        // Validate account number
        if (accountNo.length < 8) {
            transferError.textContent = "Please enter a valid account number.";
            return;
        }

        // Validate amount
        if (amount <= 0 || isNaN(amount)) {
            transferError.textContent = "Please enter a valid amount.";
            return;
        }

        // Check balance
        if (amount > account.balance) {
            transferError.textContent = "Insufficient balance.";
            return;
        }

        // Deduct money
        account.balance -= amount;

        // Add transfer to expenses
        account.expenses += amount;

        // Create transaction
        const newTransaction = {
            id: Date.now(),
            title: `Transfer to ${name}`,
            category: "Transfer",
            amount: amount,
            type: "expense",
            date: getTransactionTime()
        };

        // Add transaction to beginning
        transactions.unshift(newTransaction);

        // Update dashboard
        updateDashboard();

        // Update transactions
        displayTransactions();

        // Close modal
        closeTransfer();

        // Show success message
        alert(`₹${amount.toLocaleString("en-IN")} transferred successfully to ${name}!`);

    });
}


// Pay bills

const payBillsBtn = document.getElementById("pay-bills-btn");
const billModal = document.getElementById("bill-modal");
const closeBillModal = document.getElementById("close-bill-modal");
const billForm = document.getElementById("bill-form");
const billType = document.getElementById("bill-type");
const billAccount = document.getElementById("bill-account");
const billAmount = document.getElementById("bill-amount");
const billError = document.getElementById("bill-error");

// Open bill modal
function openBillModal() {
    if (billModal) {
        billModal.classList.add("show");
        if (billAccount) billAccount.focus();
    }
}

// Close bill modal
function closeBill() {
    if (billModal) {
        billModal.classList.remove("show");
        if (billForm) billForm.reset();
        if (billError) billError.textContent = "";
    }
}

if (payBillsBtn) payBillsBtn.addEventListener("click", openBillModal);
if (closeBillModal) closeBillModal.addEventListener("click", closeBill);

// Close when clicking outside
if (billModal) {
    billModal.addEventListener("click", function (event) {
        if (event.target === billModal) {
            closeBill();
        }
    });
}

// Bill form submit
if (billForm) {
    billForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get values
        const type = billType.value;
        const consumerId = billAccount.value.trim();
        const amount = Number(billAmount.value);

        // Validate account
        if (consumerId === "") {
            billError.textContent = "Please enter Consumer or Account ID.";
            return;
        }

        // Validate amount
        if (amount <= 0 || isNaN(amount)) {
            billError.textContent = "Please enter a valid amount.";
            return;
        }

        // Check balance
        if (amount > account.balance) {
            billError.textContent = "Insufficient balance.";
            return;
        }

        // Deduct money
        account.balance -= amount;

        // Add bill to expenses
        account.expenses += amount;

        // Create transaction
        const newTransaction = {
            id: Date.now(),
            title: `${type} Bill`,
            category: "Bills",
            amount: amount,
            type: "expense",
            date: getTransactionTime()
        };

        // Add transaction to beginning
        transactions.unshift(newTransaction);

        // Update dashboard
        updateDashboard();

        // Update transactions
        displayTransactions();

        // Close modal
        closeBill();

        // Show success message
        alert(`₹${amount.toLocaleString("en-IN")} for ${type} paid successfully!`);

    });
}


// Search transactions

const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener("input", function () {

        const query = searchInput.value.toLowerCase().trim();

        if (query === "") {
            // Show all transactions
            displayTransactions();
        } else {
            // Filter transactions
            const filtered = transactions.filter(function (t) {
                return (
                    t.title.toLowerCase().includes(query) ||
                    t.category.toLowerCase().includes(query)
                );
            });

            displayTransactions(filtered);
        }

    });
}


// View all transactions

const viewAllBtn = document.getElementById("view-all-btn");

if (viewAllBtn) {
    viewAllBtn.addEventListener("click", function (event) {

        // Prevent page refresh
        event.preventDefault();

        showAllTransactions = !showAllTransactions;

        if (showAllTransactions) {
            viewAllBtn.innerHTML = `Show Less <i class="fa-solid fa-arrow-up"></i>`;
        } else {
            viewAllBtn.innerHTML = `View All <i class="fa-solid fa-arrow-right"></i>`;
        }

        // Update list
        displayTransactions();

    });
}


// Sidebar and notifications

const navLinks = document.querySelectorAll(".nav-menu .nav-link");

navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {

        // If transfer link, ignore
        if (link.id === "nav-transfer") return;

        // Prevent page refresh
        event.preventDefault();

        // Change active link
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        const pageName = link.getAttribute("data-page");
        if (pageName === "Notifications") {
            showNotifications();
        }

    });
});

// Show notifications
function showNotifications() {
    alert("🔔 Notifications:\n\n" + notifications.map((n, i) => `${i + 1}. ${n}`).join("\n\n"));
}

const notificationBtn = document.getElementById("notification-btn");
if (notificationBtn) {
    notificationBtn.addEventListener("click", showNotifications);
}

// Need help
const helpBox = document.getElementById("help-box");
if (helpBox) {
    helpBox.addEventListener("click", function () {
        alert("📞 Customer Support\n\nNeed help? Email us at support@mybank.com or call 1800-123-4567 (24/7 Toll Free).");
    });
}

// Logout
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const confirmLogout = confirm("Are you sure you want to log out of MyBank?");
        if (confirmLogout) {
            alert("You have been safely logged out. Thank you for banking with MyBank!");
        }
    });
}


// Run functions

updateDateTime();
setInterval(updateDateTime, 1000);
updateDashboard();
displayTransactions();
initChart();
