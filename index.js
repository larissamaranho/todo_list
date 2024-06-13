var inputTask = document.getElementById("add-item")
var buttonTask = document.getElementById("button-task")
var listTask = document.getElementById("to-do-task")
var checkbox = document.getElementById("input")

buttonTask.addEventListener("click", addToDoItem)

//salva o item no local storage
function saveToDoItem(value){
    var toDoList = getToDoList();
    var toDoListItem = {
        task: value, 
        checked: false
    }
    console.log(toDoList)
    // dica: não é mais pra salvar uma string
    // precisa salvar um objeto com a tarefa e o estado dela
    toDoList.push(toDoListItem)
    localStorage.setItem("toDoList", JSON.stringify(toDoList))
}

// salvar o estado da tarefa no local storage
function saveCheckBox(e){
    var value = e.target.value
    var checked = e.target.checked
    
    console.log(e)
    var toDoList = getToDoList()
    var itemUpdated = toDoList.find(item => item.task === value)
    if (itemUpdated){
    itemUpdated.checked = checked
    }

    localStorage.setItem("toDoList", JSON.stringify(toDoList))
}

//renderiza o item e salva no local storage
function addToDoItem(){
    var value = inputTask.value
    renderToDoItem(value)
    saveToDoItem(value);
}

//renderiza o html
function renderToDoItem(value, checked){
    var newLi = document.createElement("li")
    var newInput = document.createElement("input")
    newInput.type = "checkbox"
    newInput.value = value
    newInput.checked = checked
    newInput.onchange = saveCheckBox
    newLi.appendChild(newInput)
    var newContent = document.createTextNode(value);
    newLi.appendChild(newContent)
    listTask.appendChild(newLi)
    inputTask.value = ""
    console.log(value)
}

//pega a lista
function getToDoList() {
    return JSON.parse(localStorage.getItem("toDoList")) || []
}

//renderiza a lista
document.addEventListener("DOMContentLoaded", function(){
    var toDoList = getToDoList();

    toDoList.forEach(item => {
        renderToDoItem(item.task, item.checked)
    });
})

// desafio: persistir o estado da tarefa (checkado ou não)
