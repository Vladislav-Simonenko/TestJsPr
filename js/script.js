//ПЕРВАЯ СТРАНИЦА

//получение данных из html
const mainForms = document.forms.createForm;
const createTodoInput = mainForms.nameInput;
const addButton = mainForms.button;

const taskList = document.querySelector(".todoListsTask__tasks");

//создание массива
let todoList;
!localStorage.tasks ? todoList = [] : todoList = JSON.parse(localStorage.getItem("tasks"))

let todoItemElems =[];


//конструктор задач
function Task(description) {
  this.description = description;
  this.completed = false;
}


//создание шаблона для авто генерации задач
const createTemplate = (task, i) => {
  return `
  <div class="todo-item ${task.completed ? "checked" : ""}">
    <div class="buttons">
      <button onclick="deleteTask(${i})" class="deleteTodo">X</button>
    </div>
  <div id=page${i}>
<a href="#" onclick="secondConstruction(${i});">${task.description}</a>
  </div>
  `
}



//заполнение списка
const createList = () => {
  taskList.innerHTML = "";
  if (todoList.length > 0) {
    todoList.forEach((item, i) => {
      taskList.innerHTML += createTemplate(item, i);
    });
    todoItemElems = document.querySelectorAll(".todo-item");

    //добавление класса при клике по ссылке
    listId = document.querySelectorAll(".todo-item a");
      listId.forEach(item =>{
       item.addEventListener('click', (e) =>{
         listId.forEach(el => { el.classList.remove("checked"); });
          item.classList.add("checked")
   })
})
  }
}
createList();
//создание переменной в локал сторейдж
const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(todoList));
    localStorage.setItem(`secondTasks${todoList.length}`, JSON.stringify(todoSecondList));
}

//выбор задачи для вывода подзадач
const completeTask = i => {
  todoList[i].completed = !todoList[i].completed;
  if (todoList[i].completed) {
    todoItemElems[i].classList.add("checked")
  }else {
    todoItemElems[i].classList.remove("checked")
  }
  updateLocalStorage();
  createList();
}

//вызов конструктора по клику

createTodoInput.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
      todoList.push(new Task(createTodoInput.value));
      updateLocalStorage();
      createList();
      createTodoInput.value ="";
      window.location.reload();
    }

 });
addButton.addEventListener("click",function () {
  todoList.push(new Task(createTodoInput.value));
  updateLocalStorage();
  createList();
  createTodoInput.value ="";
})

//удаление мейн таска
const deleteTask = i => {
  todoList.splice(i, 1);
  updateLocalStorage();
  createList();
}

//отмена отправки формы по ENTER
mainForms.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        event.preventDefault();
    }

 });

// ВТОРАЯ СТРАНИЦА
const secondForm = document.forms.createSecondForm;
const createTodoSecondInput = secondForm.nameSecondInput;

const taskSecondList = document.querySelector(".todoListsTask__tasks-secondWindow");

//создание массива
let i = todoList.length;

let todoSecondList;
!localStorage.secondTasks1  ? todoSecondList = [] : todoSecondList = JSON.parse(localStorage.getItem(`secondTasks${i}`));



let todoSecondItemElems = [];

//конструктор задач
function TaskManager(secondDescription) {
  this.secondDescription = secondDescription;
  this.secondCompleted = false;
}

//создание шаблона для авто генерации подзадач
const createSecondTemplate = (task2, index) => {
  return `
  <div id="p${index}" class="todo-seconditem  ${task2.secondCompleted ? "completeds" : ""}">
      <label class="secondDescription" for="todo-seconditem"> ${task2.secondDescription}</label>
    <div class="second-buttons">
      <input onclick="completeSecondTask(${index})" type="checkbox" class="btn-complete" ${task2.secondCompleted ? "checked" : ""}>
      <button onclick="deleteSecondTask(${index})" class="deleteTodo">X</button>
    </div>
  </div>
  `
}

//функции радиокнопок.
const filterTasks =() => {
  const activeTasks = todoSecondList.length && todoSecondList.filter(item2 => item2.secondCompleted == false)
  const complitedTasks = todoSecondList.length && todoSecondList.filter(item2 => item2.secondCompleted == true)
  todoSecondList = [...activeTasks,...complitedTasks];
}

function secondConstruction(i) {

//заполнение списка
const createSecondList = () => {
   taskSecondList.innerHTML = "";
   if (todoSecondList.length > 0) {
     filterTasks();
     todoSecondList.forEach((item2, index) => {
       taskSecondList.innerHTML += createSecondTemplate(item2, index);
     });
     todoSecondItemElems = document.querySelectorAll(".todo-seconditem");
   }
}
createSecondList();


// фильтр для кнопок

const filterBox = document.querySelectorAll(".todo-seconditem");
document.querySelector(".todoListsTask__details-complited").addEventListener("click", (event) => {
if (event.target.id == " ") return false;
  let filterClass = event.target.id;
  filterBox.forEach((elem) => {
    elem.classList.remove("hide");
    if (elem.classList.contains(filterClass) && filterClass !== "btnall") {
      elem.classList.add("hide");
    }

  });

});
console.log("остался ток вывод определенного таска по клику.");
}

const completeSecondTask = index => {
  todoSecondList[index].secondCompleted = !todoSecondList[index].secondCompleted;
  if (todoSecondList[index].secondCompleted) {
    todoSecondItemElems[index].classList.add("completeds")
  }else {
      todoSecondItemElems[index].classList.remove("completeds")
  }
  updateLocalStorage();
  secondConstruction();

}

//вызов конструктора по клику
createTodoSecondInput.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
  todoSecondList.push(new TaskManager(createTodoSecondInput.value));
  updateLocalStorage();
  secondConstruction();
  createTodoSecondInput.value = "";
    }
})

//удаление  таска
const deleteSecondTask = index => {
  todoSecondList.splice(index, 1);
  updateLocalStorage();
  secondConstruction();

}


//отмена отправки формы по ENTER
secondForm.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        event.preventDefault();
    }

 });

//добавление класса
 let filrersChoise = document.querySelectorAll('.filrersChoise');
 let lastClicked = filrersChoise[0];
 for( let i = 0; i < filrersChoise.length; i++ ){
   filrersChoise[i].addEventListener('click', function(){
     lastClicked.classList.remove('active');
     this.classList.add('active');
     lastClicked = this;
   });
 }



//Поиск
const searcher = document.getElementById('elastic');
searcher.oninput = function () {
  let val = this.value.trim();
  let elasticItem = document.querySelectorAll(".secondDescription")
  if (val != "") {
    elasticItem.forEach((elem, i) => {
      if (elem.innerText.search(val) == -1) {
        elem.classList.add("hide");
      }else {
        elem.classList.remove("hide");
      }
    });

  }else {
    elasticItem.forEach((elem, i) => {
        elem.classList.remove("hide");
    })
  }
}

//отмена отправки формы по ENTER

searcher.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        event.preventDefault();
    }

 });
