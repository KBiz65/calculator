let operator = "";
let temporaryNumber = 0;
let enteredNumber = 0;
let totalValue = 0;
let entireNumber = [];
let numbersEnteredArray = [];

const displayScreen = document.getElementById("display-screen");

function setupCalculator() {
  const buttons = document.getElementById("main-container");
  displayScreen.textContent = 0;
  
  for (let i = 0; i < buttons.children.length; i++) {
    let button = buttons.children[i];
    button.addEventListener("click", function (e) {
      let targetClass = e.target.classList[0];
      // console.log(targetClass);
      if (targetClass === "numberBtn") {
        getNumber(e.target.value);
      } 

      if ((targetClass === "clearBtn") || (targetClass === "backspaceBtn")) {
        // console.log(e.target.id);
        clearDisplay(e.target.id);
      }

      if (targetClass === "operatorBtn") {
        // console.log(e.target.id);
        mathOperator(e.target.id);
      }

      if (targetClass === "equalsBtn") {
        // console.log(e.target.id)
        calculateAnswer();
      }
    })
  }
}

function getNumber(targetValue) {
  if (entireNumber.length < 16) {

    entireNumber.push(targetValue);
    displayScreen.textContent = entireNumber.join('');
    enteredNumber = parseFloat(entireNumber.join(''));
    // console.log("enteredNumber: ", enteredNumber);
    // console.log("temporaryNumber: ", temporaryNumber);
  } else {
    displayScreen.textContent = "Max 15 characters"
  }
}

function clearDisplay(targetClear) {
  if (targetClear === "backspace") {
    entireNumber.pop();
    displayScreen.textContent = entireNumber.join('');
  }

  if (targetClear === "clear-entry") {
    entireNumber = [];
    enteredNumber = 0;
    displayScreen.textContent = entireNumber.join('');
  }

  if (targetClear === "clear-all") {
  operator = "";
  temporaryNumber = 0;
  enteredNumber = 0;
  totalValue = 0;
  entireNumber = [];
  numbersEnteredArray = [];
    displayScreen.textContent = entireNumber.join('');
  }
}

function mathOperator(targetOperator) {

  if (targetOperator === 'add') {
    console.log("totalValue before: ", totalValue);
    totalValue = totalValue + enteredNumber;
    console.log("totalValue after: ", totalValue);
    enteredNumber = 0;
    entireNumber = [];
    displayScreen.textContent = totalValue;

  }
}

setupCalculator();