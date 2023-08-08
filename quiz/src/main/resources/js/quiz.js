
const API_QUIZ = 'http://localhost:8080/api/quiz'
console.log(2345)

function renderQuiz(){
    $.ajax({
        url: API_QUIZ,
        method: "GET",
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'},
    }).done(data => {
        console.log(data)
        let str = '';
        data.forEach(quiz => {
            let ques = '';
            quiz.questions.forEach(question => {
                let ans = '';
                question.answers.forEach(answer => {
                    console.log(question.type)
                    if(question.type === "radio"){
                        ans += ` <div class="form-check">
              <input class="form-check-input" type="radio" name="ques-${question.id}" id="answer-${answer.id}">
              <label class="form-check-label" for="flexRadioDefault1">
                  ${answer.content}
              </label>
          </div>`
                    }
                    else {
                        ans += ` <div class="form-check">
              <input class="form-check-input" type="checkbox" name="ques-${question.id}" id="answer-${answer.id}">
              <label class="form-check-label" for="flexRadioDefault1">
                  ${answer.content}
              </label>
          </div>`
                    }
                })
                ques += ` <h4>${question.content}</h4>
            ${ans}
          `
            })
            str += ` <h2>${quiz.content}</h2>
  <div id="">
      <div id="question">
         ${ques}
      </div>
  </div>`
        })
        document.getElementById('quiz').innerHTML = str;
    })

}
renderQuiz();