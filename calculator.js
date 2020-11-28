let operator = "";
let memory = "";
let memoryStored = 0;
let entireNumber = [];
let numbersToCalculate = [];

const displayScreen = document.getElementById("display-screen");

function setupCalculator() {
  const buttons = document.getElementById("main-container");
  displayScreen.textContent = 0;
  
  for (let i = 0; i < buttons.children.length; i++) {
    let button = buttons.children[i];
    button.addEventListener("click", function (e) {
      let targetClass = e.target.classList[1];
      if (targetClass === "number") {
        getNumber(e.target.id);
      } 

      if (targetClass === "clear" || "backspace") {
        clearDisplay(e.target.id);
      }

      if (targetClass === "operator") {
        mathOperator(e.target.id);
      }

      if (targetClass === "equals") {
        calculateAnswer();
      }
    })
  }
}

function getNumber(targetNumber) {
  if (entireNumber.length < 16) {

    if (targetNumber === "number-one") {
      entireNumber.push(1);
      displayScreen.textContent = entireNumber.join('');
    }

    if (targetNumber === "number-two") {
      entireNumber.push(2);
      displayScreen.textContent = entireNumber.join('');
    }

    if (targetNumber === "number-three") {
      entireNumber.push(3);
      displayScreen.textContent = entireNumber.join('');
    }

    if (targetNumber === "number-four") {
      entireNumber.push(4);
      displayScreen.textContent = entireNumber.join('');
    }

    if (targetNumber === "number-five") {
      entireNumber.push(5);
      displayScreen.textContent = entireNumber.join('');
    }

    if (targetNumber === "number-six") {
      entireNumber.push(6);
      displayScreen.textContent = entireNumber.join('');
    }
  
    if (targetNumber === "number-seven") {
      entireNumber.push(7);
      displayScreen.textContent = entireNumber.join('');
    }
  
    if (targetNumber === "number-eight") {
      entireNumber.push(8);
      displayScreen.textContent = entireNumber.join('');
    }
  
    if (targetNumber === "number-nine") {
      entireNumber.push(9);
      displayScreen.textContent = entireNumber.join('');
    }
  
    if (targetNumber === "number-zero") {
      entireNumber.push(0);
      displayScreen.textContent = entireNumber.join('');
    }
  
    if ((targetNumber === "decimal-point") && (entireNumber.includes(".") === false)) {
      entireNumber.push(".");
      displayScreen.textContent = entireNumber.join('');
    }
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
    displayScreen.textContent = entireNumber.join('');
  }

  if (targetClear === "clear-all") {
    operator = "";
    memory = "";
    memoryStored = 0;
    entireNumber = [];
    numbersToCalculate = [];
    displayScreen.textContent = entireNumber.join('');
  }
}

function mathOperator(targetOperator) {
  operator = targetOperator;
  numbersToCalculate.push(entireNumber.join(''));
  entireNumber = [];
}

function calculateAnswer() {
  if (operator = "add") {
    numbersToCalculate.push(entireNumber.join(''));
    


    operator = "";
    memory = "";
    memoryStored = 0;
    entireNumber = [];
    numbersToCalculate = [];
  }
}

setupCalculator();