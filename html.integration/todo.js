let doneBTN;
let todosList;
let addBtn;
let allBtn;
let filterButtons;
let clearCompletedBtn;
let todos;

window.addEventListener('DOMContentLoaded', () => {
    todosList = document.getElementById("all-todos");
    filterButtons = document.getElementById("filter");
    filterButtons.addEventListener("click",filterClass)
    addBtn = document.getElementById("addButton");
    addBtn.addEventListener("click",createItem);
    ItemButtons();
    clearCompletedBtn = document.getElementById("clearall");
    clearCompletedBtn.addEventListener("click",removeAllCompleted);
    selectorsDropdown();
    completedDisplay();
});

// create new todo item
function createItem(event){
    event.preventDefault();
    event.stopPropagation();
    const myInput = document.getElementById("input").value;
    // outer DIV
    const todoItem = createNewElement("div","todo-item")
    // top item DIV
    const todoItemTop = createNewElement("div","todo-item-top")
    const inputItem = createNewElement("input","taskcheckbox","checkbox");
    const labelItem = createNewElement("label","title");
    labelItem.innerText = myInput;
    todoItemTop.appendChild(inputItem);
    todoItemTop.appendChild(labelItem);
    addOptions(todoItemTop);
    todoItem.appendChild(todoItemTop);
    todosList.append(todoItem);
    completedDisplay()
    clearField("Write something, don’t be shy!");
};

function onKeyPress(event) {
    event.preventDefault();
    event.stopPropagation();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        createItem();
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
function createNewElement(element,className,addType){
    const createdElement = document.createElement(element);
    if(className !== ""){
        createdElement.classList.add(className);
    };
    if(addType){
        createdElement.type = addType;
    }
    return createdElement;
}

//create a element and append it to parent
function appendItem(element,className,parrentItem,extraClass,innerText){
    const newEllement = createNewElement(element,className);
    if(extraClass !== ""){
        newEllement.classList.add(extraClass);
    };
    if(innerText !== ""){
        newEllement.innerText = innerText;
    };
    parrentItem.appendChild(newEllement);
}

//add options to item
function addOptions(parrentItem){
    //outer container
    const options = createNewElement("div","options");
    //icon options
    const showOptions = createNewElement("span","show-options");
    // togle option button
    showOptions.addEventListener("click",function(e){
        const optionButton = e.currentTarget;
        optionButton.nextElementSibling.classList.toggle('show');
    })
    appendItem("i","fa",showOptions,"fa-ellipsis-v","");
    //dropdown options
    const buttonContainer = createNewElement("div","options-dropdown");
    appendItem("button","edit",buttonContainer,"","Edit");
    appendItem("button","delete",buttonContainer,"","Delete");
    appendItem("button","addlabelbtn",buttonContainer,"","Add label");
    //add label
    const addLabel = createNewElement("div","addlabel");
        //add H6
    appendItem("h6","",addLabel,"","Add Label");
        //add form
    const formItem = createNewElement("form","");
    const formInput = createNewElement("input","addlabelInput");
    formInput.type = "text";
    formInput.placeholder = "Enter label name";
    formInput.name = "addlabel";
    formItem.appendChild(formInput);
    addLabel.appendChild(formItem);
    //add 3 options to outer div
    options.appendChild(showOptions);
    options.appendChild(buttonContainer);
    options.appendChild(addLabel);
    parrentItem.append(options);
}

///////// Item buttons 
function ItemButtons() {
    todosList.addEventListener("click", e => {
        if(e.target.className === "taskcheckbox"){
            let toAdjustItem = e.target.parentNode.parentNode;
            toAdjustItem.classList.toggle("done-item");
            completedDisplay();
        }
        if(e.target.className === "delete"){
            let parentNodeItem = e.target.parentNode.parentNode.parentNode.parentNode;
            parentNodeItem.parentNode.removeChild(parentNodeItem);
        }if(e.target.className ==="edit"){
            if(e.target.innerText === "Edit"){
                editText(e);
            }else {
                saveText(e)
            }
        }
    })
};

//editText function
function editText(e){
    console.log(e.target.parentNode);
    let inputText = e.target.parentNode.parentNode.parentNode.childNodes[1]
    e.target.innerText = "Save";
    e.target.style.backgroundColor = "#fa5f1c";
    inputText.style.backgroundColor = "rgb(88 81 81)";
    inputText.contentEditable = true;
    console.log(inputText);
}


//saveText function
function saveText(e) {
    console.log(e.target);
    let inputText = e.target.parentNode.parentNode.parentNode.childNodes[1]
    e.target.innerText = "Edit";
    e.target.style.backgroundColor = "var(--black)";
    inputText.style.backgroundColor = "transparent";
    inputText.contentEditable = false;
    console.log(inputText);
    e.target.parentNode.classList.toggle("show");
}


//remove all completed items
function removeAllCompleted(){
    let todos = document.getElementsByClassName("todo-item");
    for (let i = 0; i < todos.length; i++) {
        if(todos[i].classList.contains("done-item")){
            todos[i].parentNode.removeChild(todos[i]);
        }
        
    }
    completedDisplay();
}

// filter by class
function filterClass(e){
    e.preventDefault();
    let todos = document.getElementsByClassName("todo-item");
        if(e.target.className === "all"){
            showAllItems(todos)
        }
        if(e.target.className === "allCompleted"){
            showAllItems(todos)
            for (let i = 0; i < todos.length; i++) {
                if(!todos[i].classList.contains("done-item")){
                    todos[i].classList.toggle("hide-item");
                }
              }
        }
        if(e.target.className === "allActive"){
            showAllItems(todos)
            for (let i = 0; i < todos.length; i++) {
                if(todos[i].classList.contains("done-item")){
                    todos[i].classList.toggle("hide-item");
                }
              }
        }
}
// show all items
function showAllItems(todos){
    for(let i = 0; i < todos.length; i++){
        todos[i].classList.remove("hide-item");
    }
}

// completed items
function completedDisplay(){
    let totalTasks = document.getElementsByClassName("todo-item");
    let totalTasksCompleted = document.getElementsByClassName("done-item");
    let tasksCompleted = document.querySelectorAll(".task-completed")[0];
    tasksCompleted.innerText = totalTasksCompleted.length +" of "+totalTasks.length+" Completed ";
}