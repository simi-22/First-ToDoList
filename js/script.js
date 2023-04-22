//유저가 값을 입력한다
//+ 버튼을 클릭하면, 할 일이 추가된다

//delete버튼 누르면 할일이 삭제돈다
//check를 누르면 할일이 done되면서 밑줄이 이동한다
//1.check버튼을 클릭하는 순간 isComplete = true반환
//2.true이면 끝난걸로 간주하고 밑줄
//3.false이면 안끝난걸로 간주하고 그대로
//done Not done 누르면 언더바 이동
//done 탭은 끝난 아이템만, not done탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

//슬라이드 바 만들기
//enter 버튼 클릭하면 자동으로 아이템추가하기
//How to add enter event javascript
//ongoing, end tab에서도 삭제 적용되게 해보기
//css완성하기

let todoInput = document.getElementById("todo-input");
//inputValue(입력창에 쓴 값)를 배열로 저장..///////
let submitButton = document.getElementById('submit-button');
let taskList = [];
let filterList = [];
let todoContent = document.getElementById('todo-content');
let taskContent = todoInput.value;
let tabs = document.querySelectorAll('#todo-title li');
let mode = 'all'

for(let i = 0 ; i<tabs.length ; i++){
    tabs[i].addEventListener('click',function(event){filter(event)});
}
console.log(tabs)

//할 일 추가 버튼에 함수추가
submitButton.addEventListener('mousedown',submitTask);

//엔터키 함수;
    todoInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      submitTask(event);
    }
  });

//할 일 추가버튼을 눌렀을때 실행되는 함수 = task배열에 입력값 추가.
function submitTask(){

let task = {
    id : CreateRandomID(),
    taskContent : todoInput.value,
    isComplete : false,
};

   //submit 버튼 누르면 task가 taskList에 저장
   taskList.push(task);
   console.log(taskList);
   todoInput.value = "";
   render();
}

//이제 html 넣어줘야함. 배열에 따라서.

function render(){
    let list =[];
    if (mode == "all") {
        list = taskList;
    } else if(mode == "ongoing" || mode == "done"){
        list = filterList;
    }

    let resultHTML = "";
    for(let i = 0 ; i < list.length; i++) {
        if(list[i].isComplete == true){
        resultHTML += `
        <li class="content-inner"> 
        <div>
            <p class = "todo-done">${list[i].taskContent}</p>
        </div>
        <div class="button-wrapper ">
            <button onclick ="checkButtonEvent('${list[i].id}')">Check</button>
            <button onclick="deleteButtonEvent('${list[i].id}')">Delete</button>
        </div>
    </li>`} else{
        resultHTML += `
        <li class="content-inner"> 
        <div>
            <p>${list[i].taskContent}</p>
        </div>
        <div class="button-wrapper">
            <button onclick ="checkButtonEvent('${list[i].id}')">Check</button>
            <button onclick="deleteButtonEvent('${list[i].id}')">Delete</button>
        </div>
    </li>`
        }
    }
    document.getElementById("todo-content").innerHTML = resultHTML;
}


//delete함수
function deleteButtonEvent(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;   
        }
    }
        console.log(taskList);
        render();
    
    for(let i = 0; i < filterList.length; i++){
        if(filterList[i].id == id){
            filterList.splice(i,1)
            break;   
        }
    }
        console.log(filterList);
        render();
}

//완료버튼 이벤트 함수
function checkButtonEvent(id){
    for( let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    } 
   console.log(taskList);
   render();
}   

function filter(event){
    mode = event.target.id
   
    if( mode === "all"){
        render();
    }
    
    filterList = [];
    if( mode === "ongoing" ){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }render();
    }else if(mode === "done"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
    }render();
    
} 
}

//랜덤아이디 함수
function CreateRandomID(){
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}
