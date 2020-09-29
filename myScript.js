class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number){
        if (number === "." && this.currentOperand.includes(".")) return ;
        this.currentOperand = this.currentOperand.toString() + number.toString(); 
        // console.log(number);
    }
    chooseOperation(operation){
        if(this.currentOperand === "") return ;
        if(this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute(){
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                computation = previous + current;
                break;
            case "-":
                computation = previous - current;
                break;
            case "*":
                computation = previous * current;
                break;
            case "÷":
            case "/":
                computation = previous / current;
                break;
            default:
                return ;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDigits}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
    button.addEventListener("click", function() {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 96:
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
            calculator.appendNumber(`${event.key}`);
            calculator.updateDisplay();
            break;
        case 106:
        case 107:
        case 109:
        case 111:
            calculator.chooseOperation(`${event.key}`);
            calculator.updateDisplay();
            break;
        case 13:
            calculator.compute();
            calculator.updateDisplay();
            break;
        case 8:
            calculator.delete();
            calculator.updateDisplay();
            break;
        case 46:
            calculator.clear();
            calculator.updateDisplay();
            break;
    }
});