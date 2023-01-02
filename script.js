
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input")
const enterBtn = document.getElementById("enter");
let taskData
let id
const check = `bi-check-circle`;
const uncheck = `bi-circle`;
const lineThrough = "line-through";
const openBtn = document.getElementById("modalBtn");
const closeBtn = document.getElementById("modalBtnClose");
const modal = document.getElementById("modal");
const userName = document.getElementById("userName");
const signIn = document.getElementById("signInBtn");
const insertName = document.getElementById("user");

//Modal Window

let getName = [];

signIn.addEventListener('click', () => {
    getName = userName.value;

    if (getName) {
        insertName.innerHTML = `Hola! ${getName}`
    }

    localStorage.setItem('USER',JSON.stringify(getName));

    modal.close();
})



openBtn.addEventListener('click', () => {
    modal.showModal();
})

closeBtn.addEventListener('click', () => {
    modal.close();
})


// Date Function

const d = new Date();
date.innerHTML = d.toLocaleDateString('es-ES', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
});


//add task

function addTask(task, id, finished, deleted) {

    if (deleted) {
        return;
    }

    const done = finished ? check : uncheck;
    const lined = finished ? lineThrough : "";

    const listElement = `<li id="element">
    <i class="bi ${done}" data-state="finished" id="${id}"></i>
    <p class="text ${lined}">${task}</p>
    <i class="bi bi-trash-fill" data-state="deleted" id="${id}"></i>
</li>`;

    list.insertAdjacentHTML("beforeend", listElement);
};

//check task

function checkTask(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    taskData[element.id].finished = taskData[element.id].finished ? false : true; 
    
}

//delete task

function deleteTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    taskData[element.id].deleted = true;
    

}

enterBtn.addEventListener("click", () => {
    const task = input.value;

    if (task) {
        addTask(task, id, false, false);
        taskData.push({
            content: task,
            id: id,
            finished: false,
            deleted: false
        });
    };
    input.value = "";
    id++;
    localStorage.setItem('TODO',JSON.stringify(taskData));
});

document.addEventListener("keyup", function(e) {
    if (e.key == "Enter") {
        const task = input.value;

    if (task) {
        addTask(task, id, false, false);
        taskData.push({
            content: task,
            id: id,
            finished: false,
            deleted: false
        });
    };
    input.value = "";
    id++;
    localStorage.setItem('TODO',JSON.stringify(taskData));
    }
});

list.addEventListener("click", function(e) {
    const element = e.target;
    const elementData = element.getAttribute("data-state");
    if (elementData==="finished") {
        checkTask(element);
    } else if (elementData==="deleted") {
        deleteTask(element);
    };
    localStorage.setItem('TODO',JSON.stringify(taskData));
});

// Load Storaged data
let userInfo = localStorage.getItem('USER');

if (userInfo) {
    getName = JSON.parse(userInfo);
    insertName.innerHTML = `Hola! ${getName}`;

}

let listInfo = localStorage.getItem('TODO');

if (listInfo) {
    taskData = JSON.parse(listInfo);
    id = taskData.length;
    loadList(taskData);
} else {
    taskData = [];
    id = 0;
}

function loadList(INFO) {
    INFO.forEach(function(i) {
        addTask(i.content, i.id, i.finished, i.deleted)});
};