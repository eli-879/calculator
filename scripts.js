function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) {
        alert("Don't Divide By Zero!")
        return ">:(";
    }
    return num1 / num2; 
}

function operate(event) {
    const operator = valuesObject.operator;
    const num1 = valuesObject.storedNum;
    const num2 = valuesObject.currentNum;
    valuesObject.pastOperand = valuesObject.currentNum;
    let answer = "";

    if (operator == "+") answer = add(num1, num2);
    else if (operator == "-") answer = subtract(num1, num2);
    else if (operator == "×") answer = multiply(num1, num2);
    else if (operator == "÷") answer = divide(num1, num2);
    
    if  (answer.toString().length > 20) answer = Math.round(answer * 10000000000)  / 10000000000;
   
    valuesObject.currentNum = answer;

    const currentValue = document.querySelector(".number");
    currentValue.innerText = valuesObject.currentNum;

}

function clearDisplayValue(event) {
    const currentValue = document.querySelector(".number");
    valuesObject.currentNum = "";

    currentValue.innerText = valuesObject.currentNum;
}

function changeDisplayValue(event) {
    if (valuesObject.clear == true) {
        clearDisplayValue(event);
        valuesObject.clear = false;
        valuesObject.calculate = true;
    }

    
    const number = event.target.innerText;
    
    valuesObject.currentNum = valuesObject.currentNum + number;
    const currentValue = document.querySelector(".number");
    currentValue.innerText = valuesObject.currentNum;
}

function storeDisplayValue(event) {
    valuesObject.calculate = false;
    const storedValue = document.querySelector(".expression");
    valuesObject.storedNum = valuesObject.currentNum;
        
    storedValue.innerText = `${valuesObject.currentNum} ${valuesObject.operator}`;

}

function changeOperator(event) {
    const operator = event.target.innerText;
    valuesObject.operator = operator;
    valuesObject.clear = true;
}

function clear(event) {
    clearDisplayValue(event);

    valuesObject.operator = "";
    valuesObject.storedNum = "";
    valuesObject.clear = false;

    const storedNum = document.querySelector(".expression");
    storedNum.innerText = valuesObject.storedNum;
}

function del(event) {
    let num = valuesObject.currentNum.toString();
    valuesObject.currentNum = num.slice(0, num.length-1);
    console.log(num, num.toString().slice(0, num.length-1), valuesObject.currentNum);
    let currentValue = document.querySelector(".number");
    currentValue.innerText = valuesObject.currentNum;
}

function addDecimalPoint(event) {
    let currentNum = document.querySelector(".number").innerText.toString();
    console.log(currentNum);
    if (!(currentNum.includes("."))) {
        changeDisplayValue(event);
    }
}

let valuesObject = {
    currentNum: "",
    operator: "",
    storedNum: "",
    clear: false,
    calculate: false
}

// Adding event listeners that change the screen when clicking on a number
const buttonsNumbers = document.querySelectorAll(".button-number");

for (const button of buttonsNumbers) {
    button.addEventListener("click", (e) => {
        changeDisplayValue(e);
    });
}

// Adding event listeners that store current value in main screen when
// operator pressed
const buttonsOperators = document.querySelectorAll(".button-operator");

for (const button of buttonsOperators) {
    button.addEventListener("click", (e) => {
        
        if (valuesObject.currentNum != "") {
            if (valuesObject.calculate == true) {
                operate(e);
            }
            changeOperator(e);
            storeDisplayValue(e);
        }
       
    })
}

// Event listener for equals
const buttonEqual = document.querySelector(".button-equals");
buttonEqual.addEventListener("click", (e) => {
    valuesObject.calculate = false;
    operate(e);
    valuesObject.operator = "=";
    
   
})

// Add event listener for del / clear
const buttonClear = document.querySelector(".button-clear");
buttonClear.addEventListener("click", (e) => {
    clear(e);
})

const buttonDelete = document.querySelector(".button-del");
buttonDelete.addEventListener("click", (e) => {
    del(e);
})

// Add event listener for decimal point 
const buttonDecimal = document.querySelector(".button-decimal");
buttonDecimal.addEventListener("click", (e) => {
    addDecimalPoint(e);
})


