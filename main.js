
let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let msg = document.getElementById('msg');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let add = document.getElementById('add');
let tasks = document.getElementById('tasks');


form.addEventListener('submit', function(e){
    e.preventDefault();
    formValidation();
    
})

let formValidation = () =>{
    if(textInput.value === ''){
        msg.innerHTML = 'Task cannot be empty!';
    }else{
        msg.innerHTML = '';
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();

        (()=>{
            add.setAttribute("data-bs-dismiss",""); 
        })();
    };
};

let data =[];
let acceptData = () => {
    data.push({
        text:textInput.value,
        date:dateInput.value,
        textarea:textarea.value,
     });
     localStorage.setItem('data',JSON.stringify(data));
     console.log(data);
    createTasks();
    
}

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x,y)=>{
        return (tasks.innerHTML +=`
        <div id = ${y}>
        <span class="fw-bold">${x.text}</span><br>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.textarea}</p>
        <span class="options">
            <i onClick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick = "deleteTask(this)" class="fas fa-trash-alt"></i>
        </span>
    </div>
    `);
    });0

    
resetForm();
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.querySelector('.fw-bold').innerHTML;
    dateInput.value = selectedTask.querySelector('.text-secondary').innerHTML;
    textarea.value = selectedTask.querySelector('p').innerHTML;

    deleteTask(e);
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

(()=>{
    data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();
