function convertMarkdown() {
  const input = document.getElementById("markdown-input").value;

  let output = input;

  // ---- HEADINGS (must start at beginning of line) ----
  output = output.replace(/^\s*###\s(.+)$/gm, "<h3>$1</h3>");
  output = output.replace(/^\s*##\s(.+)$/gm, "<h2>$1</h2>");
  output = output.replace(/^\s*#\s(.+)$/gm, "<h1>$1</h1>");

  // ---- BLOCKQUOTES ----
  output = output.replace(/^\s*>\s(.+)$/gm, "<blockquote>$1</blockquote>");

  // ---- IMAGES ----
  output = output.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');

  // ---- LINKS ----
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // ---- BOLD ----
  output = output.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/__(.*?)__/g, "<strong>$1</strong>");

  // ---- ITALIC ----
  output = output.replace(/\*(.*?)\*/g, "<em>$1</em>");
  output = output.replace(/_(.*?)_/g, "<em>$1</em>");

  // ---- REMOVE NEWLINES (important for tests) ----
  output = output.replace(/\n/g, "");

  return output;
}

// ---- EVENT LISTENER (required) ----
const input = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function updateConverter() {
  const result = convertMarkdown();

  // Show raw HTML
  htmlOutput.textContent = result;

  // Render HTML
  preview.innerHTML = result;
}

if (input && htmlOutput && preview) {
  input.addEventListener("input", updateConverter);
  updateConverter();
}