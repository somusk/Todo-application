let unorderList = document.getElementById("unorderList");
let addbtn = document.getElementById("AddBtn");
let saveBtn = document.getElementById("saveBtn");


function localStoragecreation() {
    let local = localStorage.getItem("sample");
    let res = JSON.parse(local);
    if (res === null) {
        return [];
    } else {
        return res;
    }
}

let todoList = localStoragecreation();
console.log(todoList);

saveBtn.onclick = function() {
    localStorage.setItem("sample", JSON.stringify(todoList));
};

function labelstrikeOff(checkboxId, labelId, todoId) {
    let checkBoxId = document.getElementById(checkboxId);
    let LabelId = document.getElementById(labelId);
    LabelId.classList.toggle("checked");
    // if (checkBoxId.checked === true){
    //     LabelId.classList.add("checked");
    // }else{
    //     LabelId.classList.remove("checked");
    // }

    let findingIndex = todoList.findIndex(function(eachitem) {
        let newId = "todo" + eachitem.uniqueNo;
        if (newId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let newIndexnum = todoList[findingIndex];
    if (newIndexnum.ischecked === true) {
        newIndexnum.ischecked = false;
    } else {
        newIndexnum.ischecked = true;
    }


}

function createToItem(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let newList = document.createElement("li");
    newList.classList.add("d-flex", "flex-row", "mb-3");
    newList.id = todoId;
    unorderList.appendChild(newList);

    let inputElement = document.createElement("input");
    inputElement.classList.add("checkbox");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.ischecked;
    inputElement.onclick = function() {
        labelstrikeOff(checkboxId, labelId, todoId);
    };
    newList.appendChild(inputElement);

    let divEl = document.createElement("div");
    divEl.classList.add("container", "d-flex", "flex-row");
    newList.appendChild(divEl);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.textContent = todo.text;
    labelEl.classList.add("labelcolor");
    labelEl.id = labelId;
    if (todo.ischecked === true) {
        labelEl.classList.add("checked");
    }
    divEl.appendChild(labelEl);

    let divEl2 = document.createElement("div");
    divEl2.classList.add("delbtn");
    divEl.appendChild(divEl2);



    let delEl = document.createElement("i");
    delEl.classList.add("far", "fa-trash-alt", "delete-icon");
    delEl.onclick = function() {
        unorderList.removeChild(newList);
        localStorage.clear(todoId);

        let deleteItem = todoList.findIndex(function(eachitem) {
            let eachtodoId = "todo" + eachitem.uniqueNo;
            if (eachtodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });
        todoList.splice(deleteItem, 1);
    };
    divEl2.appendChild(delEl);

}

for (let item of todoList) {
    createToItem(item);
}

let inputValue = document.getElementById("inputValue");

function addingnewTodo() {
    let counter = todoList.length;
    counter += 1;

    let Value = inputValue.value;
    let id = counter;

    if (Value === "") {
        alert("Enter a valid number");
        return;
    }
    let newtodo = {
        text: Value,
        uniqueNo: id,
        ischecked: false
    };
    todoList.push(newtodo);
    createToItem(newtodo);
    inputValue.value = "";
}

addbtn.onclick = function() {
    addingnewTodo();
}

// localStorage.removeItem("sample)";