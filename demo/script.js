const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let currentValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function formatNumber(number) {
    const maxLength = 12;
    const stringNumber = number.toString();
    if (stringNumber.length > maxLength) {
        return Number(number).toExponential(maxLength - 7);
    }
    return stringNumber;
}

function calculate(first, second, operator) {
    first = Number(first);
    second = Number(second);
    
    switch(operator) {
        case '+': return first + second;
        case '-': return first - second;
        case '×': return first * second;
        case '÷': return second === 0 ? 'Error' : first / second;
        default: return second;
    }
}

function updateDisplay(value = currentValue) {
    display.value = formatNumber(value);
}

function handleNumber(number) {
    if (waitingForSecondOperand) {
        currentValue = number;
        waitingForSecondOperand = false;
    } else {
        currentValue = currentValue === '0' ? number : currentValue + number;
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = currentValue;
    
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
    
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        if (result === 'Error') {
            currentValue = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay('Error');
            return;
        }
        currentValue = String(result);
        firstOperand = currentValue;
    }
    
    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            handleNumber(button.textContent);
        }
        
        if (button.classList.contains('decimal')) {
            if (!currentValue.includes('.')) {
                currentValue += '.';
                updateDisplay();
            }
        }
        
        if (button.classList.contains('operator')) {
            handleOperator(button.textContent);
        }
        
        if (button.classList.contains('equals')) {
            if (operator && !waitingForSecondOperand) {
                handleOperator('=');
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        
        if (button.classList.contains('clear')) {
            currentValue = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    });
});

// Add keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        handleNumber(event.key);
    }
    if (event.key === '.') {
        if (!currentValue.includes('.')) {
            currentValue += '.';
            updateDisplay();
        }
    }
    if (['+', '-'].includes(event.key)) {
        handleOperator(event.key);
    }
    if (event.key === '*') handleOperator('×');
    if (event.key === '/') {
        event.preventDefault();
        handleOperator('÷');
    }
    if (event.key === 'Enter' || event.key === '=') {
        if (operator && !waitingForSecondOperand) {
            handleOperator('=');
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        }
    }
    if (event.key === 'Escape') {
        currentValue = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
});

// Initialize display on page load
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});
