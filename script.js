class Calculator {

    constructor(previousDisplayElement, currentDisplayElement) {
        this.previousDisplayElement = previousDisplayElement;
        this.currentDisplayElement = currentDisplayElement;
        this.clear()
    }

    clear() {
        this.currentDisplay =''
        this.previousDisplay = ''
        this.operation = undefined
    }
    delete() {
       this.currentDisplay = this.currentDisplay.slice(0,-1)
    }

    appendNumber(number) {
        if (number === "." && this.currentDisplay.includes('.')) return;
        this.currentDisplay = this.currentDisplay.toString() + number.toString();
    }

    updateDisplay() {
        this.currentDisplayElement.innerText = this.currentDisplay
        this.previousDisplayElement.innerText = this.previousDisplay
       

    }

    pickOperator(operation) {   
        if (this.currentDisplay==='') return;
        if(this.previousDisplay !== '') {
            this.calc();
        }
        

        this.previousDisplay = this.currentDisplay;
        this.currentDisplay = ""
        this.operation = operation;
        

    }

    singleOperator(operation) {
        if (this.currentDisplay !== '') {
            this.calc2()
        }
        this.operation = operation
    }
    calc2() {
        let c
        const current = parseFloat(this.currentDisplay)
        switch(this.operation) {

            case '%': 
                c = current/100;
                break;
            default:
                return
        }
        this.currentDisplay = c
        this.operation = undefined
    }

    calc() {
        let result
        const prev = parseFloat(this.previousDisplay)
        const current = parseFloat(this.currentDisplay)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current
                break;
            case '*':
                result = prev *current
                break;
            case '/':
                result = prev/current
                break;
            case '%':
                result = current/100
                break;
            default:
                return
        }
        this.currentDisplay= result;
        this.operation = undefined;
        this.previousDisplay=''
    }
}


const operations = document.querySelectorAll('[data-operation]')
const numberButtons = document.querySelectorAll('[data-number]')
const equalButton = document.querySelector('[data-equal]')
const operationSingle = document.querySelector('[data-operation-single]')
const clearButton = document.querySelector('[data-clear]')
const clearAllButton = document.querySelector('[data-clearall]')
const previousDisplayElement = document.querySelector('[data-previous]')
const currentDisplayElement = document.querySelector('[data-current]')


let calculator = new Calculator(previousDisplayElement, currentDisplayElement);

numberButtons.forEach(button => { 
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
        
    })
    
});

operations.forEach(button => {
    button.addEventListener('click', ()=> {

        calculator.pickOperator(button.innerText)
        calculator.updateDisplay()
    })
})

clearAllButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay()
})

clearButton.addEventListener('click', ()=> {
    calculator.delete();
    calculator.updateDisplay()
})

equalButton.addEventListener('click', ()=> {
    calculator.calc()
    calculator.updateDisplay()
})
operationSingle.addEventListener('click', ()=> {
    calculator.singleOperator(operationSingle.innerText);
    calculator.updateDisplay()
    console.log('11')
})
