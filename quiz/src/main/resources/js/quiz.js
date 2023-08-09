
const API_QUIZ = 'http://localhost:8080/api/quiz'
let questions;
let submitBtn = ''
function renderQuiz(){
    $.ajax({
        url: API_QUIZ,
        method: "GET",
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'},
    }).done(data => {
        let str = '';
        data.forEach(quiz => {
            questions = quiz.questions;
            console.log(questions.length)



            // question = questions[0]
            let ques = ``;
            quiz.questions.forEach((question,index) => {
                let ans = '';

                question.answers.forEach(answer => {
                    if(question.type === "radio"){
                        ans += ` <div class="form-check">
              <input class="form-check-input" value="${answer.content}" type="radio" name="ques-${question.id}" id="answer-${answer.id}">
              <label class="form-check-label" for="flexRadioDefault1">
                  ${answer.title}.${answer.content}
              </label>
          </div>`
                    }
                    else {
                        ans += ` <div class="form-check">
              <input class="form-check-input" value="${answer.content}" type="checkbox" name="ques-${question.id}" id="answer-${answer.id}">
              <label class="form-check-label" for="flexRadioDefault1">
                  ${answer.title}.${answer.content}
              </label>
          </div>`
                    }
                })

                ques += `
                <div id="question-${index}" class="question-item">
                    <h4 class="alert alert-primary disabled">${index+1}.${question.content}</h4>
                     ${ans}
                      <div  style="text-align: end">
                      <button onclick="prev(${index})" class="btn btn-primary">Prev</button>
                        <button onclick="next(${index})" class="btn btn-primary">Next</button>
  </div>
                </div>
                 
                    `
            })
            str += ` <h1 align="center">${quiz.content}</h1>
                     <div id="a">
                  <div id="questions">
                     ${ques}
                       
      </div>
  </div>
 `
        })
        document.getElementById('quiz').innerHTML = str;
        document.getElementById("question-0").style.display = "block"
    })

}
renderQuiz();

function prev(index){
    let next = index-1;

    document.getElementById("question-"+index).style.display = "none"

    document.getElementById("question-"+next).style.display = "block"
}

function next(index){
    let next = index+1;

    document.getElementById("question-"+index).style.display = "none"

    document.getElementById("question-"+next).style.display = "block"
}

function submit(){
    let values = [];
    let isFull = true;
    for (let i = 1; i <= questions.length; i++) {
        let inputName = "ques-" + i;
        let inputElement = document.querySelectorAll('input[name="' + inputName + '"]:checked');
        console.log(inputElement.length)
        if(inputElement.length<=0){
            isFull=false;
            break;
        } else {
            let answerO = {};
            let checkAns= [];
            if (inputElement[0].type === "radio") {
                valueInput = inputElement[0].value;
                answerO.content = valueInput;
                answerO.type = "radio"
                values.push(answerO);
            } else  {
                // Lặp qua tất cả các checkbox đã chọn và lấy giá trị của chúng
                inputElement.forEach(function(checkbox) {
                    checkAns.push(checkbox.value);
                });
                answerO.content = checkAns;
                answerO.type = "checkbox"
                values.push(answerO);
            }
        }
    }
    if(!isFull){
        alert("nhập cho hết đê")
    } else {
        alert("bạn đã được " + checkAnswer(values) + "/" + questions.length + " điểm")
    }
    console.log(values)
    console.log(questions)
}

function checkAnswer(value){
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (value[i].type === "radio") {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (questions[i].answers[j].content === value[i].content && questions[i].answers[j].status === true)
                    score++;
            }
        } else if (value[i].type === "checkbox") {
            let correctAns =[]

                questions[i].answers.filter(ans => {
                   if(ans.status === true){
                       correctAns.push(ans.content)
                   }
            });
            if(checkAnsCheckbox(correctAns,value[i].content)){
                score++;
            }
        }
    }
    return score;
}
function checkAnsCheckbox(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    let ans = true;
    for (let i = 0; i < array1.length; i++) {
        if (array2.indexOf(array1[i]) === -1) {
            ans = false;
            break;
        }
    }
    return ans;
}