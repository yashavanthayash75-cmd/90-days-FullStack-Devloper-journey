let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");


addBtn.addEventListener("click" , function(){
let taskvalue = taskInput.value;
let li = document.createElement("li");

let checkbox = document.createElement("input");
checkbox.type = "checkbox";

let taskText = document.createElement("span");
taskText.textContent = taskvalue;

checkbox.addEventListener("change", function(){
   alert("Checkbox is Working!");
    taskText.style.textDecoration = checkbox.checked ?"line-through" : "none"
});


let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.type="button";

deleteBtn.addEventListener("click", function(){
    li.remove();
});

li.appendChild(checkbox);
li.appendChild(taskText);
li.appendChild(deleteBtn);

taskList.appendChild(li);

taskInput.value="";

});
