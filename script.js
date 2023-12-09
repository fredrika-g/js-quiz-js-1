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
    q: "Jamon Iberico är en exklusiv skinka. Vad äter griserna som gör skinkan unik?",
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
let resultDiv = document.querySelector("#resultContent");
let warningMsg = document.querySelector(".warning");

document.querySelector("#start").addEventListener("click", (e) => {
  constructQuiz();
  e.target.remove();
});

//submit quiz
const submitQuiz = () => {
  let warningMsg = document.querySelector(".warning");
  warningMsg.innerHTML = "";
  if (allAnswered()) {
    slidingTransition();
    document.querySelector("header").scrollIntoView({ behavior: "smooth" });
  } else {
    warningMsg.innerText = "Du måste svara på alla frågor!";
  }
};

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
  }, 1100);
}

const constructQuiz = () => {
  content.removeAttribute("class");
  content.classList.add("quizContent");

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

  content.classList.add("quizContent");
  content.append(msg, submitBtn);
};

const questionBase = (q, index) => {
  let div = document.createElement("div");
  div.dataset.id = index;
  div.classList.add("question");
  let text = document.createElement("span");
  text.innerText = q.q;
  div.append(text);

  return div;
};

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

const allAnswered = () => {
  let qDivs = [...document.querySelectorAll(".question")];
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

  return checked.length >= questions.length;
};

const checkAnswers = () => {
  let score = 0;
  let compiledAnswers = [];

  let inputElements = document.querySelectorAll("#content input");
  questions.forEach((question) => {
    let inputs = [...inputElements].filter((input) => {
      if (questionMatchesAnswer(input, question)) {
        return input.checked;
      }
    });

    let everyCorrect = question.a.filter((a) => {
      return a.isCorrect;
    });

    let isCorrect = false;
    let allChecked = [];
    let answers = [];

    if (inputs.length === everyCorrect.length) {
      for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value === everyCorrect[i].value) {
          isCorrect = true;
          answers.push(everyCorrect[i].text);
        }
        allChecked.push(inputs[i].value);
      }
      if (isCorrect && answers.length === everyCorrect.length) {
        score++;
        compiledAnswers.push({ answer: answers, isCorrect: true });
      } else {
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
      compiledAnswers.push({
        answer: `Du valde ${inputs.length} alternativ, det finns ${everyCorrect.length} korrekta svar!`,
        isCorrect: false,
      });
    }
  });

  return { answers: compiledAnswers, score: score };
};

// check if answer and question belong together
const questionMatchesAnswer = (input, question) => {
  return +input.closest(".question").dataset.id === questions.indexOf(question);
};

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
