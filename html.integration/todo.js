let doneBTN;
let todosList;
let addBtn;
let allBtn;
let activeBtn;
let completedBtn;
let showOptionsBtns;

window.addEventListener('DOMContentLoaded', () => {
    todosList = document.getElementById("all-todos");
    console.log(todosList);
    addBtn = document.getElementById("addButton");
    addBtn.addEventListener("click",createItem);
    selectorsDropdown();
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

// get all active items
function activeTodos(){
    const allTodos = document.getElementsByClassName("todo-item");
    return allTodos;
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