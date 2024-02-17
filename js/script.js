//유저가 값을 입력한다
//할 일이 추가된다 (+버튼, 엔터키)
//delete버튼 누르면 할일이 삭제된다
//check를 누르면 할일이 done된다
//1.check버튼을 클릭하는 순간 isComplete = true반환
//2.true이면 끝난걸로 간주하고 밑줄
//3.false이면 안끝난걸로 간주하고 그대로
//done 탭은 끝난 아이템만, not done탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴
//How to add enter event javascript
//ongoing, end tab에서도 삭제 적용되게 해보기
//css완성하기


//++빈칸 작성 막기
//++분류목록 클릭시 구분

let todoInput = document.getElementById("todo-input");
//inputValue(입력창에 쓴 값)를 배열로 저장
let submitButton = document.getElementById('submit-button');
let taskList = [];
let filterList = [];
let todoContent = document.getElementById('todo-content');
let taskContent = todoInput.value;
let tabs = document.querySelectorAll('#todo-title li');
let mode = 'all';
let id = 0;
// let taskId = taskList.id

for(let i = 0 ; i<tabs.length ; i++){
    tabs[i].addEventListener('click',function(event){filter(event)});
}
console.log(tabs)

//할 일 추가 버튼에 함수추가
submitButton.addEventListener('click',submitTask);

//엔터키 함수;
    todoInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        if(todoInput.value == ""){
            alert("할 일을 입력해 주세요")
        }else{
            submitTask(event);
        }
      
    }
  });

//할 일 추가버튼을 눌렀을때 실행되는 함수 = task배열에 입력값 추가.
function submitTask(){
    if(todoInput.value.trim() === "") { // 입력 필드가 비어 있는지 확인
        alert("할 일을 입력해 주세요");
        return;
    }

    let task = {
        id,
        taskContent : todoInput.value,
        isComplete : false,
    };

    //submit 버튼 누르면 task가 taskList에 저장
    taskList.push(task);
    console.log(taskList);
    todoInput.value = "";
    id ++
    render();
}

//html
function render(){
    let list =[];
   
    if (mode == "all") {
        list = taskList;
    } else if(mode == "ongoing" || mode == "done"){
        list = filterList;
    }

    let resultHTML = "";

    for(let i = 0 ; i < list.length; i++) {
        let taskId = list[i].id; // 각 작업의 ID를 taskId에 할당
        if(list[i].isComplete == true){
            resultHTML += `
                <li id="${taskId}" class="content-inner"> 
                    <div>
                        <input type="checkbox" checked onchange="checkButtonEvent('${taskId}')"/>
                    </div>
                    <div>
                        <p class="todo-done">${list[i].taskContent}</p>
                    </div>
                    <button onclick="taskEditing('${taskId}')"><i class="fa-solid fa-pencil" style="color: #2d2d2dc6;"></i></button>
                    <button onclick="deleteButtonEvent('${taskId}')"><i class="fa-sharp fa-solid fa-trash"></i></button>
                </li>`;
        } else {
            resultHTML += `
                <li id="${taskId}" class="content-inner"> 
                    <div>
                        <input type="checkbox" onchange="checkButtonEvent('${taskId}')"/>
                    </div>
                    <div>
                        <p>${list[i].taskContent}</p>
                    </div>
                    <button onclick="taskEditing('${taskId}')"><i class="fa-solid fa-pencil" style="color: #2d2d2dc6;"></i></button>
                    <button onclick="deleteButtonEvent('${taskId}')"><i class="fa-sharp fa-solid fa-trash"></i></button>
                </li>`;
        }
    }
    document.getElementById("todo-content").innerHTML = resultHTML;
}







//수정함수
function taskEditing(taskId) {
    const item = taskList.find(item => item.id == taskId)
    const prevValue = item.taskContent;
    const itemIndex = taskList.findIndex(item => item.id == taskId)
    
    if(!item.isCompleted){
        let newValue = prompt(`변경사항을 입력하세요.`)
    
        // 사용자가 값을 입력하지 않거나 취소를 누른 경우 처리
        newValue = newValue.trim()
        if (newValue == null || newValue == '') {
            // 입력이 취소되었거나 공백 문자열이면 아무것도 하지 않음
            alert('입력문자가 없습니다.')
            return;
        }
      
         taskList[itemIndex].taskContent = newValue; //새로운 값 반영

         // 필터된 리스트에서도 기존 taskContent 값을 찾아서 newValue로 바꿔줍니다.
         i = filterList.findIndex(item => item.taskContent == prevValue);
         if (i != -1) {
             filterList[i].taskContent = newValue;
         }
 
    
        render()
    }
}





//delete함수
function deleteButtonEvent(taskId){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == taskId){
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
function checkButtonEvent(taskId){
    for( let i = 0; i < taskList.length; i++){
        if(taskList[i].id == taskId){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    } 
   render();
}


function filter(event){
    mode = event.target.id
   
    if( mode === "all"){
        render();
        tabs[1].classList.remove('showing');
        tabs[2].classList.remove('showing');
        tabs[0].classList.add('showing');
    }
    
    filterList = [];
    if( mode === "ongoing" ){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }render();
        tabs[0].classList.remove('showing');
        tabs[2].classList.remove('showing');
        tabs[1].classList.add('showing');
    }else if(mode === "done"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }render();
        tabs[0].classList.remove('showing');
        tabs[1].classList.remove('showing');
        tabs[2].classList.add('showing');
    
} 
}

// //랜덤아이디 함수
// function CreateRandomID(){
//     return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
// }
