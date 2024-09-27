const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

function updateDisplay() {
    const display = document.querySelector('display')
    display.textContent = calculator.displayValue;
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } 
    else {
calculator.displayValue = calculator.displayValue === '0' ? digit : calculator.displayValue + digit;
    }
    updateDisplay()
}

function inputDecimal(dot) {
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue = +dot;
    }
    updateDisplay()
}

function handleOperator(nextOperator) {
    const { firstOperand, operator, displayValue } = calculator;
    const inputValue = perseFloat(displayValue)

    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null &&listNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    }
    else if(operator) {
        const result = performCalculation[operator]
        (firstOperand,inputValue);
        calculator.displayValue = String (result)
        calculator.firstOperand = result;
    }
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
}

const performCalculation = {
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
};

function resetCalculation() {
    calculator.displayValue = '0';
    calculator.waitingForSecondOperand = false;
    calculator.firstOperand = null;
    calculator.oper = null;

    updateDisplay();
}
function deleteLastDigit() {
    calculator.displayValue = calculator.displayValue.slice(0, -1);
    if(calculator.displayValue==='') {
        calculator.displayValue = '0'
    }
    updateDisplay();
}

function toggleSign() {
    calculator.displayValue = string(perseFloat(calculator.displayValue) * -1);
    updateDisplay();
}

function handlePercentage() {
    calculator.displayValue = String(perseFloat(calculator.displayValue) / 100);
    updateDisplay();
}

const keys = document.querySelector('.button');
keys.addEventListener('click', event => {
    const {target} = event;
    if(!target.matches('button') ) {
        return;
    }
if (target.textContent==='C') {
    toggleSign();
    return;
}
if (target.textContent === '%') {
    handlePercentage();
    return;
}
if(target.classList.contains('operators')) {
    handleOperator(target.textContent);
    return;
}
if(target.textContent === '.') {
    inputDecimal(target.textContent);
    return;
}
if(target.textContent === '←') {
    deleteLastDigit();
    return;
}
inputDigit(target.textContent);
}}
