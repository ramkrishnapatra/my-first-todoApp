document.addEventListener("DOMContentLoaded",()=>{
let addTaskButton=document.getElementById("add-task-btn")
let todoList=document.getElementById("todo-list")
let todoInput=document.getElementById("todo-input")
let Tasks=JSON.parse(localStorage.getItem("Tasks")) || []
Tasks.forEach(element => {
  renderTask(element)
});
addTaskButton.addEventListener("click",function(){
  let task=todoInput.value.trim();
  if(task==="") return;
  let obj={
     id:Date.now(),
    text:task
  };
  todoInput.value = "";
  Tasks.push(obj)
  saveTask()
  renderTask(obj)
})
function renderTask(task){
    let item= document.createElement("li")
    item.setAttribute("data-id",task.id)
    item.innerHTML=`<span>${task.text}</span>
    <button>Delete</button>`
    item.addEventListener("click",(e)=>{
     if(e.target.tagName==="BUTTON") return;
     item.classList.toggle("completed")
    })
     item.querySelector("button").addEventListener("click",(e)=>{
         e.stopPropagation()
        Tasks=Tasks.filter((t)=>{
        t.id!==task.id
      })
       item.remove()
       saveTask()
       
    })
   todoList.appendChild(item) 
}
function saveTask(){
  localStorage.setItem("Tasks",JSON.stringify(Tasks))
}
})