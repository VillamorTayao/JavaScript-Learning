const showResult = document.querySelector('.show-result');
const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', toDoList);

let container = JSON.parse(localStorage.getItem('container')) || [];

function toDoList(){
    const toDo = document.querySelector('.todo-input');
    const date = document.querySelector('.todo-date');
    
    const toDoValue = toDo.value;
    const dateValue = date.value;

    if(toDo.value.trim() == '' || date.value.trim() == ''){
        return alert('you shall not pass!');
    } else {
        container.push({toDoValue, dateValue});
        showToDo();
        toDo.value = '';
        date.value = '';

        localStorage.setItem('container', JSON.stringify(container));
    }
}

function showToDo(){
    const makeVisible = document.createElement('div');
    makeVisible.setAttribute('class', 'visible');

    let resultContainer = '';
    for(let i = 0; i < container.length; i++){
        const {toDoValue, dateValue} = container[i];

        resultContainer += `
            <div class="result-style animate">${toDoValue}</div>
            <div class="result-style animate">${dateValue}</div>
            <button class="animate" onclick="deleter(${i});" style="border: none;">Done?</button>
        `;
    }

    showResult.innerHTML = resultContainer;
}

const popupAway = document.getElementById('visible-trigger');
popupAway.addEventListener('click', function(){
    const popup = document.querySelector('.popup');
    popup.classList.add('window-hidden');

    const mainWindow = document.querySelector('.container');
    mainWindow.classList.remove('visible');
});

function deleter(index){
    container.splice(index, 1);
    localStorage.setItem('container', JSON.stringify(container));
    showToDo();
}
