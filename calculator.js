add = (a, b) => a + b;

subtract = (a, b) => a - b;

multiply = (a, b) => a * b;

divide = (a, b) => a / b;

operate = (a, b, operator) => {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

var a = "";
var b = "";
var operator = "";

let log = document.querySelector("#math-log");
let output = document.querySelector("#output");


updateDisplay = (number) => {
    if(output.innerText === "0") {
        output.innerText = "";
    }
    output.innerText += number;
}

updateVariable = () => {
    if(a === "") {
        a = output.innerText;
    } else {
        b = output.innerText;
    }
    output.innerText = "0";
}

getResult = () => {
    updateVariable();
    result = operate(parseInt(a), parseInt(b), operator);
    output.innerText = result;
    a = result;
    b = 0;
    operator = "";
}

const numbers = document.querySelectorAll(".number");
numbers.forEach(function(numberButton) {
    numberButton.addEventListener("click", function(e) {
        updateDisplay(e.target.innerText);
    });
});

const operators = document.querySelectorAll(".operator");
operators.forEach(function(operatorButton) {
    operatorButton.addEventListener("click", function(e) {
        updateVariable();
        operator = e.target.innerText;
    })
})

const equalsButton = document.querySelector("#button-equals");
equalsButton.addEventListener("click", function() {
    getResult();
})

clear = () => {
    a = "";
    b = "";
    operator = "";
    output.innerText = "0";
}

const clearButton = document.querySelector("#button-clear");
clearButton.addEventListener("click", function() {
    clear()
})

const clearEntryButton = document.querySelector("#button-clear-entry");
clearEntryButton.addEventListener("click", function() {
    output.innerText = "0";
})

const backspaceButton = document.querySelector("#button-backspace");
backspaceButton.addEventListener("click", function() {
    output.innerText = output.innerText.slice(0, -1);
    if(output.innerText === "") {
        output.innerText = "0";
    }
})




