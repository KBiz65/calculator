let temporaryNumber = 0;
let entireNumber = [];
let calculateArray = [];
let targetClass = "";
let memoryValue = 0;

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
        getNumber(e.target.value);
      } 

      if ((targetClass === "clearBtn") || (targetClass === "backspaceBtn")) {
        clearDisplay(e.target.id);
      }

      if (targetClass === "operatorBtn") {
        calculateArray.push(temporaryNumber);
        calculateArray.push(e.target.id);
        entireNumber = [];
        temporaryNumber = 0;

        if (calculateArray.length >= 3) {
          runningTally();
        }
      }

      if (targetClass === "equalsBtn") {
        calculateArray.push(temporaryNumber);
        finalAnswer();
      }

      if (targetClass === "memoryBtn") {
        modifyMemory(e.target.id);
      }
    })
  }
}

function getNumber(targetValue) {
  if (entireNumber.length < 16) {

    entireNumber.push(targetValue);
    temporaryNumber = +parseFloat(entireNumber.join(''));
    answerDisplay.textContent = temporaryNumber;
  } else {
    answerDisplay.textContent = "Max 15 characters"
  }
}

function clearDisplay(targetClear) {
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
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) + (+parseFloat(calculateArray[2]))).toFixed(3));
    answerDisplay.textContent = +parseFloat(calculateArray[0]);
  }

  if ((calculateArray[1] === "subtract") && ((calculateArray[3] === "add") || (calculateArray[3] === "subtract"))) {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) - (+parseFloat(calculateArray[2]))).toFixed(3));
    answerDisplay.textContent = +parseFloat(calculateArray[0]);
  }

  if (calculateArray[1] === "multiply") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) * (+parseFloat(calculateArray[2]))).toFixed(3));
    answerDisplay.textContent = +parseFloat(calculateArray[0]);
  }

  if (calculateArray[1] === "divide") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) / (+parseFloat(calculateArray[2]))).toFixed(3));
    answerDisplay.textContent = +parseFloat(calculateArray[0]);
  }

  if ((calculateArray.length === 6) && (calculateArray[3] === "multiply")) {
    calculateArray.splice(2, 3, (+parseFloat(calculateArray[2]) * (+parseFloat(calculateArray[4]))).toFixed(3));
    answerDisplay.textContent = +parseFloat(calculateArray[0]);
  }

  if ((calculateArray.length === 6) && (calculateArray[3] === "divide")) {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[2]) / (+parseFloat(calculateArray[4]))).toFixed(3));
    answerDisplay.textContent = +parseFloat(calculateArray[0]);
  }

  if ((calculateArray[3] === "multiply") || (calculateArray[3] === "divide")) {
    answerDisplay.textContent = +parseFloat(calculateArray[2]);
  }
}

function finalAnswer() {
  if (calculateArray[3] === "multiply") {
    calculateArray.splice(2, 3, (+parseFloat(calculateArray[2]) * (+parseFloat(calculateArray[4]))).toFixed(3));
  }

  if (calculateArray[3] === "divide") {
    calculateArray.splice(2, 3, (+parseFloat(calculateArray[2]) / (+parseFloat(calculateArray[4]))).toFixed(3));
  }

  if (calculateArray[1] === "add") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) + (+parseFloat(calculateArray[2]))).toFixed(3));
  }

  if (calculateArray[1] === "subtract") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) - (+parseFloat(calculateArray[2]))).toFixed(3));
  }

  if (calculateArray[1] === "multiply") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) * (+parseFloat(calculateArray[2]))).toFixed(3));
  }

  if (calculateArray[1] === "divide") {
    calculateArray.splice(0, 3, (+parseFloat(calculateArray[0]) / (+parseFloat(calculateArray[2]))).toFixed(3));
  }

  answerDisplay.textContent = +parseFloat(calculateArray[0]);
  temporaryNumber = +parseFloat(calculateArray[0]);
  entireNumber = [];
  calculateArray = [];
}

function modifyMemory(memoryAction) {

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