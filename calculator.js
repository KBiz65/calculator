let temporaryNumber = 0;
let entireNumber = [];
let calculateArray = [];
let targetClass = "";
let memoryValue = 0;
let lastButtonPressed = "";

const memoryDisplay = document.getElementById("memory-display");
const answerDisplay = document.getElementById("answer-display");

function setupCalculator() {
  const buttons = document.getElementById("main-container");
  answerDisplay.textContent = 0;
  
  for (let i = 0; i < buttons.children.length; i++) {
    let button = buttons.children[i];
    button.addEventListener("click", function (e) {
      targetClass = e.target.classList[0];
      
      if (targetClass === "numberBtn") {
        lastButtonPressed = "number";
        getNumber(e.target.value);
      } 

      if ((targetClass === "clearBtn") || (targetClass === "backspaceBtn")) {
        lastButtonPressed = "clear";
        clearDisplay(e.target.id);
      }

      if (targetClass === "operatorBtn") {
        addOperator(e.target.id);

        if (calculateArray.length >= 3) {
          runningTally();
        }
      }

      if (targetClass === "equalsBtn") {
        calculateArray.push(temporaryNumber);
        finalAnswer();
      }

      if (targetClass === "memoryBtn") {
        lastButtonPressed = "memory";
        modifyMemory(e.target.id);
      }
    })
  }
}

function getNumber(targetValue) {
  if (entireNumber.length < 16) {
    if (targetValue === ".") {
      entireNumber.push(".");
      answerDisplay.textContent = (entireNumber.join('')).toString();
    } else {
      entireNumber.push(targetValue);
      answerDisplay.textContent = (entireNumber.join('')).toString();
      temporaryNumber = parseFloat(entireNumber.join(''));
    }

  } else {
    answerDisplay.textContent = "Max 15 characters"
  }
}

function addOperator(operator) {
  if (lastButtonPressed === "operator") {
    calculateArray[calculateArray.length - 1] = operator;
  } else {
    calculateArray.push(temporaryNumber);
    calculateArray.push(operator);
    entireNumber = [];
    temporaryNumber = 0;
    lastButtonPressed = "operator";
  }
}

function clearDisplay(targetClear) {
  operatorPressed = false;
  equalsPressedAgain = false;
  if (targetClear === "backspace") {
    entireNumber.pop();
    answerDisplay.textContent = entireNumber.join('');
  }

  if (targetClear === "clear-entry") {
    entireNumber = [];
    answerDisplay.textContent = entireNumber.join('');
  }

  if (targetClear === "clear-all") {
    temporaryNumber = 0;
    entireNumber = [];
    calculateArray = [];
    answerDisplay.textContent = entireNumber.join('');
  }
}

function runningTally() {
  if ((calculateArray[1] === "add") && ((calculateArray[3] === "add") || (calculateArray[3] === "subtract"))) {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) + (+parseFloat(calculateArray[2]))).toExponential(10));
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if ((calculateArray[1] === "subtract") && ((calculateArray[3] === "add") || (calculateArray[3] === "subtract"))) {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) - (+parseFloat(calculateArray[2]))).toExponential(10));
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if (calculateArray[1] === "multiply") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) * (+parseFloat(calculateArray[2]))).toExponential(10));
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if (calculateArray[1] === "divide") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) / (+parseFloat(calculateArray[2]))).toExponential(10));
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if ((calculateArray.length === 6) && (calculateArray[3] === "multiply")) {
    calculateArray.splice(2, 3, (+parseFloat(calculateArray[2]) * (+parseFloat(calculateArray[4]))).toExponential(10));
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if ((calculateArray.length === 6) && (calculateArray[3] === "divide")) {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[2]) / (+parseFloat(calculateArray[4]))).toExponential(10));
    answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  }

  if ((calculateArray[3] === "multiply") || (calculateArray[3] === "divide")) {
    answerDisplay.textContent = +parseFloat(calculateArray[2]).toExponential(10);
  }
}

function finalAnswer() {
  if (calculateArray[3] === "multiply") {
    calculateArray.splice(2, 3, (+parseFloat(calculateArray[2]) * (+parseFloat(calculateArray[4]))));
  }

  if (calculateArray[3] === "divide") {
    calculateArray.splice(2, 3, (+parseFloat(calculateArray[2]) / (+parseFloat(calculateArray[4]))).toExponential(10));
  }

  if (calculateArray[1] === "add") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) + (+parseFloat(calculateArray[2]))).toExponential(10));
  }

  if (calculateArray[1] === "subtract") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) - (+parseFloat(calculateArray[2]))).toExponential(10));
  }

  if (calculateArray[1] === "multiply") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) * (+parseFloat(calculateArray[2]))).toExponential(10));
  }

  if (calculateArray[1] === "divide") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) / (+parseFloat(calculateArray[2]))).toExponential(10));
  }

  if (lastButtonPressed !== "equals") {
    equalsAgainNumber = temporaryNumber;
  }

  answerDisplay.textContent = +parseFloat(calculateArray[0]).toExponential(10);
  temporaryNumber = +parseFloat(calculateArray[0]).toExponential(10);
  entireNumber = [];
  calculateArray = [];
  console.log(lastButtonPressed);
}

function modifyMemory(memoryAction) {
  operatorPressed = false;

  if (memoryAction === "memory-add") {
    memoryValue += temporaryNumber;
    memoryDisplay.textContent = "M";
    temporaryNumber = 0;
    calculateArray = [];
  }

  if (memoryAction === "memory-subtract") {
    memoryValue -= temporaryNumber;
    memoryDisplay.textContent = "M";
    temporaryNumber = 0;
    calculateArray = [];
  }

  if (memoryAction === "memory-retrieve") {
    answerDisplay.textContent = +parseFloat(memoryValue).toFixed(3);
    temporaryNumber = 0;
    calculateArray = [];
  }

  if (memoryAction === "memory-clear") {
    temporaryNumber = 0;
    entireNumber = [];
    calculateArray = [];
    targetClass = "";
    memoryValue = 0;
    memoryDisplay.textContent = null;
  }

}

setupCalculator();