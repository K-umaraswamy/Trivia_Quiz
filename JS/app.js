let body = document.querySelector("body");
let form = document.querySelector("form");
let span = document.querySelector("h1 span");
let submit = document.createElement("button");
submit.className = "submit";
submit.innerHTML = "Submit";
let answered = [];

// some variables
let numQues = 0;
let level = 0;
let category = parseInt(span.innerText);
//  console.log(category);

let idx = 0;
//question array
let questions = [];

let StartQuiz = () => {
  console.log(idx);
  body.innerHTML = "";
  let div = document.createElement("div");
  div.classList.add("questions");
  let div1 = document.createElement("div");
  const random = Math.floor(Math.random() * 3) + 1;
  if (random == 1) {
    div.innerHTML = ` <label for="agree">${questions[idx].text}</label>
<p class="option">
    <input type="radio" class = "options" name="option"  value="1">${questions[idx].correct}<br></input>
    <input type="radio" class = "options" name="option" value="2">${questions[idx].incorrect[0]}<br></input>
    <input type="radio" class = "options" name="option" value="3">${questions[idx].incorrect[1]}<br></input>
    <input type="radio" class = "options" name="option" value="4">${questions[idx].incorrect[2]}<br></input>
</p>
<button id="btn_one">Next</button>
`;
  } else if (random == 2) {
    div.innerHTML = ` <label for="agree">${questions[idx].text}</label>
    <p class="option">
        <input type="radio" class = "options" name="option"  value="2">${questions[idx].incorrect[0]}<br></input>
        <input type="radio" class = "options" name="option" value="1">${questions[idx].correct}<br></input>
        <input type="radio" class = "options" name="option" value="3">${questions[idx].incorrect[1]}<br></input>
        <input type="radio" class = "options" name="option" value="4">${questions[idx].incorrect[2]}<br></input>
    </p>
    <button id="btn_one">Next</button>
    `;
  } else if (random == 3) {
    div.innerHTML = ` <label for="agree">${questions[idx].text}</label>
        <p class="option">
            <input type="radio" class = "options" name="option"  value="2">${questions[idx].incorrect[0]}<br></input>
            <input type="radio" class = "options" name="option" value="3">${questions[idx].incorrect[1]}<br></input>
            <input type="radio" class = "options" name="option" value="1">${questions[idx].correct}<br></input>
            <input type="radio" class = "options" name="option" value="4">${questions[idx].incorrect[2]}<br></input>
        </p>
        <button id="btn_one">Next</button>
        `;
  } else if (random == 4) {
    div.innerHTML = ` <label for="agree">${questions[idx].text}</label>
            <p class="option">
                <input type="radio" class = "options" name="option"  value="2">${questions[idx].incorrect[0]}</input><br>
                <input type="radio" class = "options" name="option" value="4">${questions[idx].incorrect[2]}</input><br>
                <input type="radio" class = "options" name="option" value="3">${questions[idx].incorrect[1]}</input><br>
                <input type="radio" class = "options" name="option" value="1">${questions[idx].correct}</input><br>
            </p>
            <button id="btn_one">Next</button>
            `;
  }
  body.append(div);
  let nxtbtn = document.getElementById("btn_one");

  // var checked =document.querySelector('input[name="agree"]:checked').value;
  //if(checked==1)nqc++;

  nxtbtn.addEventListener("click", () => {
    let radio = document.querySelectorAll("input[type='radio']");
    idx++;
    for (var i=0;i< radio.length;i++) {
      if (radio[i].checked){
        if(answered.length<idx+1)
      answered.push(radio[i].value);
      else answered[idx] = radio[i].value;
      } 
      else if(i==radio.length-1){
        if(answered.length<idx+1)
      answered.push(radio[i].value);
      else answered.push(5);
      }
    }
    if (idx < questions.length) StartQuiz();
    else {
      alert("this is the end of the questions");
      body.append(submit);
    }
  });

  submit.addEventListener("click", () => {
    var nqc=0;
    var ansarr=[];
    for (var i=0; i < questions.length; i++) {
      if(answered[i]==1){
        ansarr.push(questions[i].correct);
        nqc++;
      }
      else if( answered[i]==5)ansarr.push("unanswered");
      else{
        ansarr.push(questions[i].incorrect[answered[i]-2]);
      }
    }
    body.innerHTML = `<h2 class="headingl">your questions are submitted and you have done ${nqc} correct questions answers are shown below</h2>`;
    let ques = document.createElement("div");
    for (let idx = 0; idx < questions.length; idx++) {
      let que = document.createElement("div");
      if(questions[idx].correct==ansarr[idx]){
        que.innerHTML = ` <div class="show" id="agree"><div > ${questions[idx].text}</div>
        <p > correct answer: ${questions[idx].correct}</p>
        <p  class="green"> Your answer: ${ansarr[idx]}</p></div>
        `;
      }
      else{
        que.innerHTML = ` <div class="show" id="agree"><div > ${questions[idx].text}</div>
        <p > correct answer: ${questions[idx].correct}</p>
        <p  class="red"> Your answer: ${ansarr[idx]}</p></div>
        `;
        }
        
        
      ques.append(que);
    }
    body.append(ques);
  });
};

let fetchData = async () => {
  let response = await axios.get(
    `https://opentdb.com/api.php?amount=${numQues}&category=${category}&difficulty=${level}&type=multiple`
  );
  let data = response.data.results;
  for (let q of data) {
    questions.push({
      text: q.question,
      correct: q.correct_answer,
      incorrect: q.incorrect_answers,
    });
  }
  StartQuiz();
};

//taking the difficulty and the number of question from the form
let fillData = (e) => {
  e.preventDefault(); //to stop the refreshing of the page on submitting the form
  let numQ = document.querySelector("#num_ques");
  let diffi = document.querySelector("#diff_level");
  numQues = numQ.value;
  level = diffi.value;
  //   console.log(numQues, level);
  fetchData();
};
form.addEventListener("submit", fillData);