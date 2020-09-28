class Calculator {
    constructor(prevOperand, currOperand){
        this.prevOperandElement = prevOperand;
        this.currOperandElement = currOperand;
        this.clear();
    }
    clear(){
        this.currOperand = "";
        this.prevOperand = "";
        this.operation = undefined;
    }
    delete(){

    }
    appendNumber(number){
        this.currOperand.innerText = this.currOperand.toString() + number.toString(); 
    }
    chooseOperation(){

    }
    compute(){

    }
    updateDisplay(){
        // this.currOperandElement.innerText =
        //     this.getDisplayNumber(this.currOperandElement)
        // if(this.operation != null)
        //     this.prevOperandElement.innerText = `${this.getDisplayNumber(this.prevOperandElement)} ${this.operation}`

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
        // calculator.updateDisplay();
    })
})