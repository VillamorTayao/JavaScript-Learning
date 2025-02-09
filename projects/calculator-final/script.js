let calculation = '';
let inputValue = document.querySelector('.show-input');

function calculate(number){
    calculation += number;

    document.querySelector('.show-input').innerHTML = `${calculation} `;
}

function showResult(){
    calculation = eval(inputValue.value);

    document.querySelector('.show-input').value = `${calculation}`;
    
}

function clearCalculation(){
    document.querySelector('.show-input').value = '';
}

function number(valueNum){
    inputValue.value += valueNum;
}

function showResultShortcut(event){
    if(event.key === 'Enter'){
        showResult();
    }
}