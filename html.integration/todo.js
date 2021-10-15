let doneBTN;
let todosList;
let addBtn;
let allBtn;
let filterButtons;
let clearCompletedBtn;
let todos;
let arraytodos = [];
let agressiveText;
let textBeforeEdited;

window.addEventListener('DOMContentLoaded', () => {
    todosList = document.getElementById("all-todos");
    filterButtons = document.getElementById("filter");
    filterButtons.addEventListener("click", filterClass)
    addBtn = document.getElementById("addButton");
    addBtn.addEventListener("click", createItem);
    ItemButtons();
    clearCompletedBtn = document.getElementById("clearall");
    clearCompletedBtn.addEventListener("click", removeAllCompleted);
    selectorsDropdown();
    retrieveLocalData();
    randomTextGenerator();
    completedDisplay();
});

// create new todo item
function createItem(event) {
    event.preventDefault();
    event.stopPropagation();
    const myInput = document.getElementById("input").value;
    const newTodo = {
        "task": myInput,
        "done": false
    };
    arraytodos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(arraytodos));
    // outer DIV
    const todoItem = createNewElement("div", "todo-item")
    // top item DIV
    const todoItemTop = createNewElement("div", "todo-item-top")
    const inputItem = createNewElement("input", "taskcheckbox", "checkbox");
    const labelItem = createNewElement("label", "title");
    labelItem.innerText = myInput;
    todoItemTop.appendChild(inputItem);
    todoItemTop.appendChild(labelItem);
    addOptions(todoItemTop);
    todoItem.appendChild(todoItemTop);
    todosList.append(todoItem);
    completedDisplay()
    localStorage.setItem('todos', JSON.stringify(arraytodos));
    randomTextGenerator()
    clearField("Write something, don’t be shy!");
};

function onKeyPress(event) {
    event.preventDefault();
    event.stopPropagation();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        createItem();
        randomTextGenerator();
    }
    clearField("Write something, don’t be shy!");
};

// clear input field
function clearField(value) {
    const inputfield = document.getElementById("input");
    inputfield.value = "";
    inputfield.placeholder = value;
}

// create new element and add a classname to it
function createNewElement(element, className, addType) {
    const createdElement = document.createElement(element);
    if (className !== "") {
        createdElement.classList.add(className);
    };
    if (addType) {
        createdElement.type = addType;
    }
    return createdElement;
}

//create a element and append it to parent
function appendItem(element, className, parrentItem, extraClass, innerText) {
    const newEllement = createNewElement(element, className);
    if (extraClass !== "") {
        newEllement.classList.add(extraClass);
    };
    if (innerText !== "") {
        newEllement.innerText = innerText;
    };
    parrentItem.appendChild(newEllement);
}

//add options to item
function addOptions(parrentItem) {
    //outer container
    const options = createNewElement("div", "options");
    //icon options
    const showOptions = createNewElement("span", "show-options");
    // togle option button
    showOptions.addEventListener("click", function (e) {
        const optionButton = e.currentTarget;
        optionButton.nextElementSibling.classList.toggle('show');
    })
    appendItem("i", "fa", showOptions, "fa-ellipsis-v", "");
    //dropdown options
    const buttonContainer = createNewElement("div", "options-dropdown");
    appendItem("button", "edit", buttonContainer, "", "Edit");
    appendItem("button", "delete", buttonContainer, "", "Delete");
    //add 3 options to outer div
    options.appendChild(showOptions);
    options.appendChild(buttonContainer);
    parrentItem.append(options);
}

///////// Item buttons 
function ItemButtons() {
    todosList.addEventListener("click", e => {
        if (e.target.className === "taskcheckbox") {
            let sibling = e.target.nextElementSibling;
            let toAdjustItem = e.target.parentNode.parentNode;
            toAdjustItem.classList.toggle("done-item");
            for (var i = arraytodos.length - 1; i >= 0; i--) {
                if (arraytodos[i].task === sibling.innerText) {
                    arraytodos.splice(i, 1);
                }
            }
            completedDisplay();
        }
        if (e.target.className === "delete") {
            let parentNodeItem = e.target.parentNode.parentNode.parentNode.parentNode;
            let LabelItemToRemove = e.target.parentNode.parentNode.parentNode.childNodes[1].innerText;
            parentNodeItem.parentNode.removeChild(parentNodeItem);
            for (var i = arraytodos.length - 1; i >= 0; i--) {
                if (arraytodos[i].task === LabelItemToRemove) {
                    arraytodos.splice(i, 1);
                }
            }
            addToLocalStorage(arraytodos);
            randomTextGenerator()
            completedDisplay();
        }
        if (e.target.className === "edit") {
            if (e.target.innerText === "Edit") {
                editText(e);
            } else {
                saveText(e)
            }
        }
    })
};

//editText function
function editText(e) {
    let inputText = e.target.parentNode.parentNode.parentNode.childNodes[1];
    textBeforeEdited = inputText.innerText;
    console.log(textBeforeEdited);
    e.target.innerText = "Save";
    e.target.style.backgroundColor = "#fa5f1c";
    inputText.style.backgroundColor = "rgb(88 81 81)";
    inputText.contentEditable = true;
    return textBeforeEdited
}


//saveText function
function saveText(e) {
    let inputText = e.target.parentNode.parentNode.parentNode.childNodes[1];
    console.log(inputText.innerText);
    e.target.innerText = "Edit";
    e.target.style.backgroundColor = "var(--black)";
    inputText.style.backgroundColor = "transparent";
    inputText.contentEditable = false;
    e.target.parentNode.classList.toggle("show");
    for (let i = arraytodos.length - 1; i >= 0; i--) {
        if (arraytodos[i].task == textBeforeEdited) {
            arraytodos[i].task = inputText.innerText;
        }
    }
    addToLocalStorage(arraytodos);
}


//remove all completed items
function removeAllCompleted() {
    let todos = document.getElementsByClassName("todo-item");
    for (let i = todos.length - 1; i >= 0; i--) {
        if (todos[i].classList.contains("done-item")) {
            todos[i].parentNode.removeChild(todos[i]);
        }

    }

    remove(true,arraytodos);
    addToLocalStorage(arraytodos)
    completedDisplay();
    randomTextGenerator()
}

// remove items from array 
function remove(value,arr){
    return arr.filter(item => item.done === value)
}

// filter by class
function filterClass(e) {
    e.preventDefault();
    let todos = document.getElementsByClassName("todo-item");
    if (e.target.className === "all") {
        showAllItems(todos)
    }
    if (e.target.className === "allCompleted") {
        showAllItems(todos)
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].classList.contains("done-item")) {
                todos[i].classList.toggle("hide-item");
            }
        }
    }
    if (e.target.className === "allActive") {
        showAllItems(todos)
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].classList.contains("done-item")) {
                todos[i].classList.toggle("hide-item");
            }
        }
    }
}
// show all items
function showAllItems(todos) {
    for (let i = 0; i < todos.length; i++) {
        todos[i].classList.remove("hide-item");
    }
}

// completed items
function completedDisplay() {
    let totalTasks = document.getElementsByClassName("todo-item");
    let totalTasksCompleted = document.getElementsByClassName("done-item");
    let tasksCompleted = document.querySelectorAll(".task-completed")[0];
    tasksCompleted.innerText = totalTasksCompleted.length + " of " + totalTasks.length + " Completed ";
}


//add todos to local storage
function addToLocalStorage(arraytodos) {
    // conver the array to string then store it.
    localStorage.setItem('todos', JSON.stringify(arraytodos));
}

function renderTodos(array) {
    array.forEach(item => {
        const myInput = item.task;
        // outer DIV
        const todoItem = createNewElement("div", "todo-item")
        if (item.done === true) {
            todoItem.classList.add('done-item');
        }
        // top item DIV
        const todoItemTop = createNewElement("div", "todo-item-top")
        const inputItem = createNewElement("input", "taskcheckbox", "checkbox");
        if (item.done === true) {
            todoItem.classList.add('done-item');
            inputItem.checked = true;
        }
        const labelItem = createNewElement("label", "title");
        labelItem.innerText = myInput;
        todoItemTop.appendChild(inputItem);
        todoItemTop.appendChild(labelItem);
        addOptions(todoItemTop);
        todoItem.appendChild(todoItemTop);
        todosList.append(todoItem);
        completedDisplay()
        clearField("Write something, don’t be shy!");
    });
}

//retrieve data from local storage
function retrieveLocalData() {
    if (localStorage.getItem("todos") === null) {
        randomTextGenerator();
    } else {
        arraytodos = localStorage.getItem("todos");
        arraytodos = JSON.parse(arraytodos);
        renderTodos(arraytodos)
    }
}

function randomTextGenerator(){
    agressiveText = document.getElementById("passive-agressive");
    let randomText = ["Should this really be empty?","It looks like we have nothing planned","Is it a bug or are we really out of tasks?","this looks empty, should I be worried?","If only my sprint board could look this empty"];
    if (arraytodos.length > 0) {
        agressiveText.classList.add("hide-item");
    } else {
        agressiveText.classList.remove("hide-item");
        agressiveText.innerText = randomText[Math.floor(Math.random()*randomText.length)];
    }
}