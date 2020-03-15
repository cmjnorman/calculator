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
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

var a = "";
var b = "";
var operator = "";
var resultDisplayed = false; 

let log = document.querySelector("#math-log");
let output = document.querySelector("#output");


updateDisplay = (input) => {
    if(resultDisplayed) {
        clear();
    }
    if(output.innerText === "0" && input != ".") {  
        output.innerText = "";
    }
    if(output.innerText.length < 16) { 
        output.innerText += input;
    }
}

updateOperator = (input) => {
    if(operator != "") {
        if(output.innerText === "0") {
            log.innerText = log.innerText.slice(0, -1);
        } else {
            getResult();
            updateVariable();
        }
    } else {
        updateVariable();
    }
    operator = input;
    resultDisplayed = false;
    updateLog(input);
}

updateLog = (input) => {
    if(log.innerText === "0") {
        log.innerText = "";
    }
    log.innerText += input;
    while(log.innerText.length > 32) {
        log.innerText = log.innerText.slice(1, log.innerText.length)
    }
}

updateVariable = () => {
    if(a === "") {
        a = output.innerText;
        if(!log.innerText.endsWith(a + '\u00A0')) {
            updateLog(a);
        }
    } else {
        b = output.innerText;
        updateLog(b);
    }
    output.innerText = "0";
}

getResult = () => {
    updateVariable();
    if(b === "") {
        calc = a;
    } else {
        calc = operate(parseFloat(a), parseFloat(b), operator);
    }
    output.innerText = Math.round(calc * 1000) / 1000;
    updateLog("=" + Math.round(calc * 1000) / 1000 + '\u00A0');
    resultDisplayed = true;
    a = "";
    b = "";
    operator = "";
}

clear = () => {
    a = "";
    b = "";
    operator = "";
    resultDisplayed = false;
    log.innerText = "0";
    output.innerText = "0";
}


const numbers = document.querySelectorAll(".number");
numbers.forEach(function(numberButton) {
    numberButton.addEventListener("click", function(e) {
        updateDisplay(e.target.innerText);
    });
});

const decimal = document.querySelector("#button-decimal");
decimal.addEventListener("click", function(e) {
    if(!output.innerText.includes(".")) {
        updateDisplay(".");
    }
})

const operators = document.querySelectorAll(".operator");
operators.forEach(function(operatorButton) {
    operatorButton.addEventListener("click", function(e) {
        updateOperator(e.target.innerText);
    })
})

const equalsButton = document.querySelector("#button-equals");
equalsButton.addEventListener("click", function() {
    getResult();
})

const clearButton = document.querySelector("#button-clear");
clearButton.addEventListener("click", function() {
    clear()
})

const clearEntryButton = document.querySelector("#button-clear-entry");
clearEntryButton.addEventListener("click", function() {
    if(!resultDisplayed) {   
        output.innerText = "0";
    }
})

const backspaceButton = document.querySelector("#button-backspace");
backspaceButton.addEventListener("click", function() {
    if(!resultDisplayed) {
        output.innerText = output.innerText.slice(0, -1);  //So user cannot use backspace on displayed result.
    }
    if(output.innerText === "") {
        output.innerText = "0";
    }
})

document.addEventListener("keydown", function(e) {
    if(isFinite(e.key)) {
        updateDisplay(e.key);
    } else if(e.key === ".") {
        if(!output.innerText.includes(".")) {
            updateDisplay(".");
        }
    } else if(e.key === "+") {
        updateOperator("+");
    } else if(e.key === "-") {
        updateOperator("-");
    } else if(e.key === "*") {
        updateOperator("×");
    } else if(e.key === "/") {
        updateOperator("÷");
    } else if(e.key === "Backspace") {
        if(!resultDisplayed) {
            output.innerText = output.innerText.slice(0, -1);  //So user cannot use backspace on displayed result.
        }
        if(output.innerText === "") {
            output.innerText = "0";
        }
    } else if(e.key === "Enter") {
        getResult();
    }
})




