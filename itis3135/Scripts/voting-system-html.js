// 1. Initialize poll as a Map
const poll = new Map();

// 2. addOption function
function addOption(option) {
  if (!option || option.trim() === "") {
    return "Option cannot be empty.";
  }

  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }

  poll.set(option, new Set());
  return `Option "${option}" added to the poll.`;
}

// 3. vote function
function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }

  const voters = poll.get(option);

  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }

  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
}

// 4. displayResults function
function displayResults() {
  let result = "Poll Results:\n";

  for (let [option, voters] of poll.entries()) {
    result += `${option}: ${voters.size} votes\n`;
  }

  return result.trim(); // remove last newline
}
// Add options
addOption("Mali");
addOption("Morocco");
addOption("Spain");

// Add votes
vote("Mali", "traveler1");
vote("Mali", "traveler2");
vote("Morocco", "traveler3");

const optionInput = document.getElementById("option-input");
const addOptionBtn = document.getElementById("add-option-btn");
const voteOptionSelect = document.getElementById("vote-option");
const voterIdInput = document.getElementById("voter-id");
const voteBtn = document.getElementById("vote-btn");
const showResultsBtn = document.getElementById("show-results-btn");
const resultsOutput = document.getElementById("results-output");
const votingMessage = document.getElementById("voting-message");

function renderOptionList() {
  voteOptionSelect.innerHTML = "";
  for (const option of poll.keys()) {
    const item = document.createElement("option");
    item.value = option;
    item.textContent = option;
    voteOptionSelect.appendChild(item);
  }
}

function updateResults() {
  resultsOutput.textContent = displayResults();
}

if (
  optionInput &&
  addOptionBtn &&
  voteOptionSelect &&
  voterIdInput &&
  voteBtn &&
  showResultsBtn &&
  resultsOutput &&
  votingMessage
) {
  renderOptionList();
  updateResults();

  addOptionBtn.addEventListener("click", () => {
    votingMessage.textContent = addOption(optionInput.value.trim());
    optionInput.value = "";
    renderOptionList();
    updateResults();
  });

  voteBtn.addEventListener("click", () => {
    const selectedOption = voteOptionSelect.value;
    const voterId = voterIdInput.value.trim();

    if (!selectedOption || !voterId) {
      votingMessage.textContent = "Please choose an option and enter a voter ID.";
      return;
    }

    votingMessage.textContent = vote(selectedOption, voterId);
    voterIdInput.value = "";
    updateResults();
  });

  showResultsBtn.addEventListener("click", () => {
    updateResults();
    votingMessage.textContent = "Results refreshed.";
  });
}