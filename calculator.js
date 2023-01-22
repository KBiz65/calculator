let temporaryNumber = 0;
let entireNumber = [];
let calculateArray = [];
let targetClass = "";
let memoryValue = 0;
let lastButtonPressed = "";
const memDisplay = document.getElementById("memory-display");
const answerDisplay = document.getElementById("answer-display");
const buttons = document.getElementById("main-container");
answerDisplay.textContent = 0;

document.querySelectorAll('.number-button').forEach(numberButton => {
  numberButton.addEventListener('click', e => {
    if (isNumber15Digits()) return;
    lastButtonPressed = "number";
    getNumber(e.target.value);
  })
});

document.querySelectorAll('.clear-button').forEach(clearButton => {
  clearButton.addEventListener('click', e => {
    lastButtonPressed = "clear";
    clearDisplay(e.target.id);
  })
});

document.querySelectorAll('.backspace-button').forEach(backspaceButton => {
  backspaceButton.addEventListener('click', e => {
    lastButtonPressed = "clear";
    clearDisplay(e.target.id);
  })
});

document.querySelectorAll('.operator-button').forEach(operatorButton => {
  operatorButton.addEventListener('click', e => {
    addOperator(e.target.id);
    if (calculateArray.length >= 3) {
      runningTally();
    }
  })
});

document.querySelectorAll('.equals-button').forEach(equalsButton => {
  equalsButton.addEventListener('click', () => {
    calculateArray.push(temporaryNumber);
    finalAnswer();
  })
});

document.querySelectorAll('.memory-button').forEach(memoryButton => {
  memoryButton.addEventListener('click', e => {
    lastButtonPressed = "memory";
      modifyMemory(e.target.id);
  })
});

function isNumber15Digits() {
  return entireNumber.length === 15;
}

function getNumber(targetValue) {
  if (targetValue === ".") {
    entireNumber.push(".");
    answerDisplay.textContent = (entireNumber.join('')).toString();
    return; 
  } 

  entireNumber.push(targetValue);
  answerDisplay.textContent = (entireNumber.join('')).toString();
  temporaryNumber = parseFloat(entireNumber.join(''));
}

function addOperator(operator) {
  if (lastButtonPressed === "operator") {
    calculateArray[calculateArray.length - 1] = operator;
    return;
  }
  calculateArray.push(temporaryNumber);
  calculateArray.push(operator);
  entireNumber = [];
  temporaryNumber = 0;
  lastButtonPressed = "operator";
}

function clearDisplay(targetClear) {
  operatorPressed = false;
  equalsPressedAgain = false;

  const mappedClearFunctions = {
    "backspace": backspace,
    "clear-entry": clearEntry,
    "clear-all": clearAll
  }

  const clearFunction = mappedClearFunctions[targetClear];
  clearFunction();
}

function backspace() {
  entireNumber.pop();
  answerDisplay.textContent = entireNumber.join('');
}

function clearEntry() {
  entireNumber = [];
  answerDisplay.textContent = entireNumber.join('');  
}

function clearAll() {
  temporaryNumber = 0;
  entireNumber = [];
  calculateArray = [];
  answerDisplay.textContent = entireNumber.join('');
}

function runningTally() {
  if (calculateArray[1] === "divide" && calculateArray[2] === 0) {
    answerDisplay.textContent = "Can't divide by 0";
    return;
  }

  if ((calculateArray[1] === "add") && ((calculateArray[3] === "add") || (calculateArray[3] === "subtract"))) {
    add(0, 3, 0, 2);
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if ((calculateArray[1] === "subtract") && ((calculateArray[3] === "add") || (calculateArray[3] === "subtract"))) {
    subtract(0, 3, 0, 2);
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if (calculateArray[1] === "multiply") {
    multiply(0, 3, 0, 2);
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if ((calculateArray[1] === "divide") && (calculateArray.length > 2)) {
    divide(0, 3, 0, 2);
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if ((calculateArray.length === 6) && (calculateArray[3] === "multiply")) {
    multiply(2, 3, 2, 4);
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if ((calculateArray.length === 6) && (calculateArray[3] === "divide")) {
    divide(0, 3, 2, 4);
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if ((calculateArray[3] === "multiply") || (calculateArray[3] === "divide")) {
    answerDisplay.textContent = +parseFloat(calculateArray[2]).toExponential(10);
  }
}

function finalAnswer() {
  if ((calculateArray[1] === "divide" && calculateArray[2] === 0) || (calculateArray[3] === "divide" && calculateArray[4] === 0)) {
    answerDisplay.textContent = "Can't divide by 0";
    return;
  } 

  if (calculateArray[3] === "multiply") {
    multiply(2, 3, 2, 4);
  }

  if (calculateArray[3] === "divide") {
    divide(2, 3, 2, 4);
  }

  if (calculateArray[1] === "add") {
    add(0, 3, 0, 2);
  }

  if (calculateArray[1] === "subtract") {
    subtract(0, 3, 0, 2);
  }

  if (calculateArray[1] === "multiply") {
    multiply(0, 3, 0, 2);
  }

  if (calculateArray[1] === "divide") {
    divide(0, 3, 0, 2);
  }

  answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  temporaryNumber = +parseFloat(calculateArray[0]).toExponential(10);
  entireNumber = [];
  calculateArray = [];
}

function add(startIndex, deleteCount, index1, index2) {
  calculateArray.splice(startIndex, deleteCount, (+parseFloat(calculateArray[index1]) + (+parseFloat(calculateArray[index2]))).toExponential(10));
}

function subtract(startIndex, deleteCount, index1, index2) {
  calculateArray.splice(startIndex, deleteCount, (+parseFloat(calculateArray[index1]) - (+parseFloat(calculateArray[index2]))).toExponential(10));
}

function multiply(startIndex, deleteCount, index1, index2) {
  calculateArray.splice(startIndex, deleteCount, (+parseFloat(calculateArray[index1]) * (+parseFloat(calculateArray[index2]))).toExponential(10));
}

function divide(startIndex, deleteCount, index1, index2) {
  calculateArray.splice(startIndex, deleteCount, (+parseFloat(calculateArray[index1]) / (+parseFloat(calculateArray[index2]))).toExponential(10));
}

function modifyMemory(targetMemory) {
  operatorPressed = false;

  const mappedMemoryFunctions = {
    "memory-add": memoryAdd,
    "memory-subtract": memorySubtract,
    "memory-retrieve": memoryRetrieve,
    "memory-clear": memoryClear
  }

  const memoryFunction = mappedMemoryFunctions[targetMemory];
  memoryFunction();
}

function memoryAdd() {
  memoryValue += temporaryNumber;
  memDisplay.textContent = "M";
  temporaryNumber = 0;
  calculateArray = [];
}

function memorySubtract() {
  memoryValue -= temporaryNumber;
  memDisplay.textContent = "M";
  temporaryNumber = 0;
  calculateArray = [];
}

function memoryRetrieve() {
  answerDisplay.textContent = +parseFloat(memoryValue).toFixed(3);
  temporaryNumber = 0;
  calculateArray = [];
}

function memoryClear() {
  temporaryNumber = 0;
  entireNumber = [];
  calculateArray = [];
  targetClass = "";
  memoryValue = 0;
  memDisplay.textContent = null;  
}