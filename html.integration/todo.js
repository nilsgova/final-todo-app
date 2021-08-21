let doneBTN;
let todosList;
let addBtn;

window.addEventListener('DOMContentLoaded', () => {
    todosList = document.getElementById("listTodos");
    console.log(todosList);
    addBtn = document.getElementById("addButton");
    addBtn.addEventListener("click",createItem);
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
    todoItem.appendChild(todoItemTop);
    todosList.append(todoItem);
};
// create new element and add a classname to it
function createNewElement(element,className,addType){
    const createdElement = document.createElement(element);
    createdElement.classList.add(className);
    if(addType){
        createdElement.type = addType;
    }
    return createdElement;
}


function onKeyPress(event) {
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        createItem();
    }
};