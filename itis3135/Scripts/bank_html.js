// 1. Define class
class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  // 2. Deposit method
  deposit(amount) {
    if (amount <= 0) {
      return "Deposit amount must be greater than zero.";
    }

    this.transactions.push({
      type: "deposit",
      amount: amount
    });

    this.balance += amount;

    return `Successfully deposited $${amount}. New balance: $${this.balance}`;
  }

  // 3. Withdraw method
  withdraw(amount) {
    if (amount <= 0 || amount > this.balance) {
      return "Insufficient balance or invalid amount.";
    }

    this.transactions.push({
      type: "withdraw",
      amount: amount
    });

    this.balance -= amount;

    return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
  }

  // 4. Check balance
  checkBalance() {
    return `Current balance: $${this.balance}`;
  }

  // 5. List all deposits
  listAllDeposits() {
    const deposits = this.transactions
      .filter((t) => t.type === "deposit")
      .map((t) => t.amount);

    return `Deposits: ${deposits.join(",")}`;
  }

  // 6. List all withdrawals
  listAllWithdrawals() {
    const withdrawals = this.transactions
      .filter((t) => t.type === "withdraw")
      .map((t) => t.amount);

    return `Withdrawals: ${withdrawals.join(",")}`;
  }
}

// 7. Create instance
const myAccount = new BankAccount();

// 8. Add transactions (must meet requirements)
myAccount.deposit(100);
myAccount.deposit(50);
myAccount.deposit(75);

myAccount.withdraw(30);
myAccount.withdraw(20);

const amountInput = document.getElementById("amount");
const depositBtn = document.getElementById("deposit-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const balanceBtn = document.getElementById("balance-btn");
const message = document.getElementById("message");
const balanceOutput = document.getElementById("balance-output");
const depositsOutput = document.getElementById("deposits-output");
const withdrawalsOutput = document.getElementById("withdrawals-output");
const history = document.getElementById("history");

function parseAmount() {
  const amount = Number(amountInput.value);
  return Number.isFinite(amount) ? amount : 0;
}

function renderHistory() {
  history.innerHTML = "";
  for (const transaction of myAccount.transactions) {
    const item = document.createElement("li");
    item.textContent = `${transaction.type}: $${transaction.amount}`;
    history.appendChild(item);
  }
}

function renderSummary() {
  balanceOutput.textContent = myAccount.checkBalance();
  depositsOutput.textContent = myAccount.listAllDeposits();
  withdrawalsOutput.textContent = myAccount.listAllWithdrawals();
  renderHistory();
}

if (
  amountInput &&
  depositBtn &&
  withdrawBtn &&
  balanceBtn &&
  message &&
  balanceOutput &&
  depositsOutput &&
  withdrawalsOutput &&
  history
) {
  depositBtn.addEventListener("click", () => {
    message.textContent = myAccount.deposit(parseAmount());
    renderSummary();
  });

  withdrawBtn.addEventListener("click", () => {
    message.textContent = myAccount.withdraw(parseAmount());
    renderSummary();
  });

  balanceBtn.addEventListener("click", () => {
    message.textContent = myAccount.checkBalance();
    renderSummary();
  });

  renderSummary();
  message.textContent = "Sample transactions loaded and ready.";
}