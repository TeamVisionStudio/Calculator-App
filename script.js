let input = "";

function press(val) {
  input += val;
  updateDisplay();
}

function clearEntry() {
  input = "";
  updateDisplay();
}

function clearAll() {
  input = "";
  updateDisplay();
}

function backspace() {
  input = input.slice(0, -1);
  updateDisplay();
}

function jedenprzezx() {
  if(input === "") return;
  let num = parseFloat(input);
  if (num === 0) {
    input = "Błąd";
  } else {
    input = (1 / num).toString();
  }
  updateDisplay();
}

function square() {
  if(input === "") return;
  let num = parseFloat(input);
  input = (num * num).toString();
  updateDisplay();
}

function sqrt() {
  if(input === "") return;
  let num = parseFloat(input);
  if (num < 0) {
    input = "Błąd";
  } else {
    input = Math.sqrt(num).toString();
  }
  updateDisplay();
}

function negate() {
  if(input === "") return;
  let num = parseFloat(input);
  input = (-num).toString();
  updateDisplay();
}

function percent() {
  if(input === "") return;
  let num = parseFloat(input);
  input = (num / 100).toString();
  updateDisplay();
}

function calculate() {
  if(input === "") return;
  const tokens = tokenize(input);
  if (!tokens) return document.getElementById("display").value = "Błąd";
  try {
    const result = evaluate(tokens);
    input = result.toString();
    updateDisplay();
  } catch {
    document.getElementById("display").value = "Błąd";
  }
}

function tokenize(expr) {
  const regex = /(\d+(\.\d+)?|[+\-*/])/g;
  return expr.match(regex);
}

function evaluate(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    if (!isNaN(tokens[i])) tokens[i] = parseFloat(tokens[i]);
  }

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      const res = tokens[i] === '*' ? tokens[i - 1] * tokens[i + 1] : tokens[i - 1] / tokens[i + 1];
      tokens.splice(i - 1, 3, res);
      i--;
    }
  }

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '+' || tokens[i] === '-') {
      const res = tokens[i] === '+' ? tokens[i - 1] + tokens[i + 1] : tokens[i - 1] - tokens[i + 1];
      tokens.splice(i - 1, 3, res);
      i--;
    }
  }

  return tokens[0];
}

function updateDisplay() {
  if (input === "69") {
    document.getElementById("display").value = "69 Nice";
  } else {
    document.getElementById("display").value = input;
  }
}

document.getElementById("guzik").addEventListener("click", function () {
  document.body.classList.toggle("white-mode");
});
