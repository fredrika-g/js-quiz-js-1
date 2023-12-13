//questions data. important to specify type of question
const questions = [
  {
    q: "Fyrkantiga rutor skurna ur en jättepizza kallas för pizzeta. Sant eller falskt?",
    a: [
      { text: "Sant", value: "Sant", isCorrect: false },
      { text: "Falskt", value: "Falskt", isCorrect: true },
    ],
    type: "trueOrFalse",
  },
  {
    q: "Den första permanenta hamburgerrestaurangen i Sverige hette Burger-Grill. Sant eller falskt?",
    a: [
      { text: "Sant", value: "Sant", isCorrect: true },
      { text: "Falskt", value: "Falskt", isCorrect: false },
    ],
    type: "trueOrFalse",
  },
  {
    q: "Världens äldsta tårta upptäcktes i en egyptisk grav från 4000 år sedan. Sant eller falskt?",
    a: [
      { text: "Sant", value: "Sant", isCorrect: true },
      { text: "Falskt", value: "Falskt", isCorrect: false },
    ],
    type: "trueOrFalse",
  },
  {
    q: "När kom pizza först till Sverige?",
    a: [
      { text: "1945", value: "1945", isCorrect: false },
      { text: "1947", value: "1947", isCorrect: true },
      { text: "1952", value: "1952", isCorrect: false },
      { text: "1960", value: "1960", isCorrect: false },
    ],
    type: "multipleChoice",
  },
  {
    q: "När började man pastörisera mjölk i Sverige?",
    a: [
      { text: "1910-talet", value: "1910", isCorrect: false },
      { text: "1920-talet", value: "1920", isCorrect: false },
      { text: "1930-talet", value: "1930", isCorrect: true },
      { text: "1940-talet", value: "1940", isCorrect: false },
    ],
    type: "multipleChoice",
  },
  {
    q: "Jamon Iberico är en exklusiv skinka. Vad äter grisarna som gör skinkan unik?",
    a: [
      { text: "Goliatmusseron", value: "Goliatmusseron", isCorrect: false },
      { text: "Oliver", value: "Oliver", isCorrect: false },
      { text: "Ekollon", value: "Ekollon", isCorrect: true },
      { text: "Fikon", value: "Fikon", isCorrect: false },
    ],
    type: "multipleChoice",
  },
  {
    q: "”Helan, halvan, tersen, kvarten…” Vilken är nästa i supordningen? (Från Helan går)",
    a: [
      { text: "Räfflan", value: "Räfflan", isCorrect: false },
      { text: "Kvinten", value: "Kvinten", isCorrect: true },
      { text: "Rivan", value: "Rivan", isCorrect: false },
      { text: "Septen", value: "Septen", isCorrect: false },
    ],
    type: "multipleChoice",
  },
  {
    q: "Vilka av följande är Hemköps egna varumärken? Tre rätta svar",
    a: [
      { text: "Garant", value: "Garant", isCorrect: true },
      { text: "El Dorado", value: "ElDorado", isCorrect: true },
      { text: "Xtra", value: "Xtra", isCorrect: false },
      { text: "Minstingen", value: "Minstingen", isCorrect: true },
    ],
    type: "checkbox",
  },
  {
    q: "Vilka av följande ostar är franska? Två rätta svar",
    a: [
      { text: "Raclette", value: "Raclette", isCorrect: false },
      { text: "Broccio", value: "Broccio", isCorrect: true },
      { text: "Munster", value: "Munster", isCorrect: true },
      { text: "Tete de Moine", value: "TeteDeMoine", isCorrect: false },
    ],
    type: "checkbox",
  },
  {
    q: "Böcklinglåda är en traditionell svensk rätt. Vilka av dessa ingredienser ingår? Två rätta svar",
    a: [
      { text: "Ägg", value: "Ägg", isCorrect: false },
      { text: "Persiljerot", value: "Persiljerot", isCorrect: false },
      { text: "Purjolök", value: "Purjolök", isCorrect: true },
      { text: "Dill", value: "Dill", isCorrect: true },
    ],
    type: "checkbox",
  },
];

// dark mode functionality
let toggleBtn = document.querySelector("#toggleMode");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("darkMode");

  document.body.classList.contains("darkMode")
    ? (toggleBtn.innerText = "Light Mode")
    : (toggleBtn.innerText = "Dark Mode");
});

//start quiz
let content = document.querySelector("#content");
let warningMsg = document.querySelector(".warning");

document.querySelector("#start").addEventListener("click", (e) => {
  constructQuiz();
  e.target.remove(); //removes 'start' button
});

//submit quiz
const submitQuiz = () => {
  let warningMsg = document.querySelector(".warning");
  warningMsg.innerHTML = "";
  if (allAnswered()) {
    //checks if all answered, if true proceed
    slidingTransition();
    document.querySelector("header").scrollIntoView({ behavior: "smooth" });
  } else {
    warningMsg.innerText = "Du måste svara på alla frågor!";
  }
};

// visual transition between content + calling functions to check answers and show results
function slidingTransition() {
  content.classList.add("move");
  setTimeout(() => {
    content.classList.remove("move");
    content.classList.add("right");
    content.classList.remove("quizContent");
    showResults(checkAnswers());
  }, 500);
  setTimeout(() => {
    content.classList.add("resultContent");
    content.classList.add("left");
  }, 1200);
}

const constructQuiz = () => {
  content.removeAttribute("class");
  content.classList.add("quizContent"); //apply quizContent class to get styling

  //build questions based on question type
  questions.forEach((question, index) => {
    question.type === "trueOrFalse" || question.type === "multipleChoice"
      ? content.append(buildRadioQuestion(question, index))
      : content.append(buildCheckbox(question, index));
  });

  let msg = document.createElement("span");
  msg.classList.add("warning");
  let submitBtn = document.createElement("button");
  submitBtn.innerText = "Lämna in";
  submitBtn.setAttribute("id", "submitBtn");
  submitBtn.addEventListener("click", submitQuiz);

  content.append(msg, submitBtn);
};

//creating html in common for both question types, returns a div
const questionBase = (q, index) => {
  let div = document.createElement("div");
  div.dataset.id = index;
  div.classList.add("question");
  let text = document.createElement("span");
  text.innerText = q.q;
  div.append(text);

  return div;
};

//function that takes a question and the index of the question as arguments, setting
//content and attributes based on those values. Returns div with content
const buildRadioQuestion = (q, index) => {
  let div = questionBase(q, index);
  let innerDiv = document.createElement("div");

  for (i = 0; i < q.a.length; i++) {
    let aDiv = document.createElement("div");
    let label = document.createElement("label");
    let answer = q.a[i].text;
    let value = q.a[i].value;
    label.innerText = answer;
    label.setAttribute("for", `${value}${index}`);
    let radioBtn = document.createElement("input");
    radioBtn.setAttribute("type", "radio");
    radioBtn.setAttribute("value", value);
    radioBtn.setAttribute("id", `${value}${index}`);
    radioBtn.setAttribute("name", `radio${index}`);
    aDiv.append(radioBtn, label);
    innerDiv.append(aDiv);
    div.append(innerDiv);
  }

  return div;
};

//function that takes a question and the index of the question as arguments, setting
//content and attributes based on those values. Returns div with content
const buildCheckbox = (q, index) => {
  let div = questionBase(q, index);

  let innerDiv = document.createElement("div");

  for (i = 0; i < q.a.length; i++) {
    let aDiv = document.createElement("div");
    let label = document.createElement("label");
    let answer = q.a[i].text;
    let value = q.a[i].value;
    label.innerText = answer;
    label.setAttribute("for", `${value}${index}`);
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("value", value);
    checkbox.setAttribute("id", `${value}${index}`);
    checkbox.setAttribute("name", `box${index}`);
    aDiv.append(checkbox, label);
    innerDiv.append(aDiv);
    div.append(innerDiv);
  }

  return div;
};

//checking if all questions answered, returns true or false
const allAnswered = () => {
  let qDivs = [...document.querySelectorAll(".question")]; //creating array from elements with class 'question'
  //making array from every checked input
  let checked = qDivs.filter((q) => {
    let inputs = q.querySelectorAll("input");
    let a = 0;
    inputs.forEach((input) => {
      if (input.checked) {
        a++;
      }
    });
    return a > 0;
  });

  //comparing length of checked array with length of questions array
  return checked.length >= questions.length;
};

//checking answers, returns a 'result object', containing an array of answers and the score
const checkAnswers = () => {
  let score = 0;
  //empty array that will contain 'answer objects'
  let compiledAnswers = [];

  //getting every input (checkbox or radio button)
  let inputElements = document.querySelectorAll("#content input");

  //iterating through each question
  questions.forEach((question) => {
    //making an array containing each checked input that belongs to this particular question
    let inputs = [...inputElements].filter((input) => {
      if (questionMatchesAnswer(input, question)) {
        return input.checked;
      }
    });

    //getting an array of the correct answers for this question
    let everyCorrect = question.a.filter((a) => {
      return a.isCorrect;
    });

    let isCorrect = false;
    //array to hold wrong answers
    let allChecked = [];
    // array to hold correct answers
    let answers = [];

    //checking if number of chosen answers matches number of correct ones
    if (inputs.length === everyCorrect.length) {
      //iterating through each answer
      for (i = 0; i < inputs.length; i++) {
        //checking if input value matches correct value
        if (inputs[i].value === everyCorrect[i].value) {
          isCorrect = true;
          answers.push(everyCorrect[i].text);
        }
        //pushing the answer to array
        allChecked.push(inputs[i].value);
      }
      //checking if answer is correct and amount of checked matches no of correct answers
      if (isCorrect && answers.length === everyCorrect.length) {
        score++; //increasing score by 1
        // adding to the array that is to be returned by the whole function
        compiledAnswers.push({ answer: answers, isCorrect: true });
      } else {
        //if answer is wrong
        let wrong = {};
        if (question.type === "checkbox") {
          wrong = {
            answer: "Du valde fel alternativ!",
            isCorrect: false,
          };
          compiledAnswers.push(wrong);
        } else {
          wrong = { answer: allChecked, isCorrect: false };
          compiledAnswers.push(wrong);
        }
      }
    } else {
      //if user chose less or more than the correct number of answers
      compiledAnswers.push({
        answer: `Du valde ${inputs.length} alternativ, det finns ${everyCorrect.length} korrekta svar!`,
        isCorrect: false,
      });
    }
  });

  //   returning an object with the compiled answers and the score
  return { answers: compiledAnswers, score: score };
};

// check if answer and question belong together, returns true or false
const questionMatchesAnswer = (input, question) => {
  // comparing the data attribute 'index' with the index of the question the questions array
  return +input.closest(".question").dataset.id === questions.indexOf(question);
};

// creating html using an object and its properties
const showResults = (resultObj) => {
  let scoreDiv = document.createElement("div");
  content.innerHTML = "";

  let yourPoints = document.createElement("span");
  yourPoints.innerText = "Dina poäng";
  let scoreSpan = document.createElement("span");
  scoreSpan.classList.add("score");
  scoreSpan.innerText = `${resultObj.score} / ${questions.length}`;

  let msg = document.createElement("span");
  msg.classList.add("message");
  resultObj.score < questions.length
    ? (msg.innerText = "Försök igen!")
    : (msg.innerText = "Bra jobbat!");

  scoreDiv.append(yourPoints, scoreSpan, msg);

  content.append(scoreDiv);

  // setting the color of the score
  colorScore(resultObj.score);

  let btn = document.createElement("button");
  btn.innerText = "Börja om";
  btn.setAttribute("id", "restart");
  btn.classList.add("restart");
  btn.addEventListener("click", () => {
    content.innerHTML = "";
    constructQuiz();
  });
  content.append(btn);

  resultObj.answers.forEach((result, index) => {
    let div = document.createElement("div");
    div.classList.add("result");
    let question = questions[index].q;
    let h3 = document.createElement("h3");
    h3.innerText = `${index + 1}. ${question}`;
    let answerDiv = document.createElement("div");
    answerDiv.classList.add("yourAnswer");
    let h4 = document.createElement("h4");
    let h5 = document.createElement("h5");
    let ul = document.createElement("ul");
    if (result.isCorrect) {
      h5.innerText = "Korrekt!";
      h5.classList.add("correctAnswer");
    } else {
      h5.innerText = "Fel!";
      h5.classList.add("wrongAnswer");
    }

    if (typeof result.answer === "object") {
      result.answer.forEach((answer) => {
        let li = document.createElement("li");
        li.innerText = answer;
        ul.append(li);
        h4.innerText = "Du svarade:";
      });
    } else {
      let li = document.createElement("li");
      li.innerText = result.answer;
      ul.append(li);
    }

    answerDiv.append(h4, ul, h5);
    content.append(h3, answerDiv);
  });
};

const colorScore = (score) => {
  let myScore = document.querySelector(".score");

  if (score / questions.length < 0.5) {
    myScore.classList.add("red");
  } else if (score / questions.length > 0.75) {
    myScore.classList.add("green");
  } else {
    myScore.classList.add("yellow");
  }
};
