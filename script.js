const addTask = document.querySelector('.add-task');
const deskTaskInput = document.querySelector('.description-task');
const todoList = document.querySelector('.todo-list');
const btnAll = document.querySelector('.all');
const btnAct = document.querySelector('.act');
const btnComp = document.querySelector('.comp');

const FILTER_TYPE_ALL = 'all';
const FILTER_TYPE_ACTIVE = 'act';
const FILTER_TYPE_COMPLETED = 'comp';

let imputValue = deskTaskInput.value;
let currentTab = 'all';
let todoItemElems = [];
let tasks = [];

const toGetDb = () => {
    async () => {
        tasks = await fetch('http://localhost:5000/api/user');
        return res.json();
    }
    filterTasks(currentTab);
};

const getTodoTemlate = (task, index) => {
    return `
        <li class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.content}</div>
            <div class="buttoms">
                <input onclick="completeTask(${index})" class="button-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="button-delete">Delete</button>
                <button onclick="changeTask(${index})" class="button-change">*Change</button>
                </div>
            <div class="task-line"></div>
        </li>
    `
};

const filterTasks = (currentTab)  => { 
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false );
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true );
        if (currentTab === "all") {
            render(tasks); 
        } 
        if (currentTab === "act") {
                render(activeTasks);                       
        }
        if (currentTab === "comp") {
            render(completedTasks);
        }        
};

const render = (arrayForRender)  => {
    todoList.innerHTML = '';
    if (!arrayForRender.length) return; 
    else {
        arrayForRender.forEach((item, index) => {
          todoList.innerHTML += getTodoTemlate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');  
    }
};

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) { /* Проверка выполнения */
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    filterTasks(currentTab);
};

/* const changeTask = index => {
    tasks[index].content = imputValue;
    let data = async () => {
        const res = await request('http://localhost:5000/api/user', {
        method: 'PUT', 
        body: JSON.stringify(tasks)
    })};
    imputValue = ''; 
    toGetDb()
}; */

toGetDb();  //Получение уже имеющихся данных перед выполнением кода

addTask.addEventListener('click', () => {
    const task = {
        id: Math.random(),
        content: imputValue, 
        completed: false,
    }
    let data = async () => {
        const res = await fetch('http://localhost:5000/api/user', {
        method: 'POST', 
        body: JSON.stringify(task)
    })};
    toGetDb();
    imputValue = ''; 
});

btnAll.addEventListener('click', () => {
    filterTasks(FILTER_TYPE_ALL);
});

btnAct.addEventListener('click', () => {
    filterTasks(FILTER_TYPE_ACTIVE);
});

btnComp.addEventListener('click', () => {
    filterTasks(FILTER_TYPE_COMPLETED);
});

const deleteTask = index => { //Удаление задач из списка
    let data = async () => {
        const res = await request(`http://localhost:5000/api/user/${id}`, {
        method: 'DELETE', // или 'PUT'
        body: JSON.stringify(tasks[index].id)
    })};
    updateLocal();
    toGetDb();
};