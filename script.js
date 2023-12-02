const questions = [
  {
    q: "This is either true or false",
    a: [
      { text: "Sant", value: "Sant", isCorrect: true },
      { text: "Falskt", value: "Falskt", isCorrect: false },
    ],
    type: "trueOrFalse",
  },
  {
    q: "Second true/false question",
    a: [
      { text: "Sant", value: "Sant", isCorrect: true },
      { text: "Falskt", value: "Falskt", isCorrect: false },
    ],
    type: "trueOrFalse",
  },
  {
    q: "Third true/false question",
    a: [
      { text: "Sant", value: "Sant", isCorrect: false },
      { text: "Falskt", value: "Falskt", isCorrect: true },
    ],
    type: "trueOrFalse",
  },
  {
    q: "Fourth true/false question",
    a: [
      { text: "Sant", value: "Sant", isCorrect: true },
      { text: "Falskt", value: "Falskt", isCorrect: false },
    ],
    type: "trueOrFalse",
  },
  {
    q: "Vad heter jag?",
    a: [
      { text: "Sara", value: "Sara", isCorrect: false },
      { text: "Fredrika", value: "Fredrika", isCorrect: true },
      { text: "Märta", value: "Märta", isCorrect: false },
      { text: "Gabriella", value: "Gabriella", isCorrect: false },
    ],
    type: "multipleChoice",
  },
  {
    q: "Hur gammal är jag?",
    a: [
      { text: "25", value: "25", isCorrect: true },
      { text: "23", value: "23", isCorrect: false },
      { text: "24", value: "24", isCorrect: false },
      { text: "27", value: "27", isCorrect: false },
    ],
    type: "multipleChoice",
  },
  {
    q: "Svara rätt",
    a: [
      { text: "Svar A", value: "A", isCorrect: false },
      { text: "Svar B", value: "B", isCorrect: false },
      { text: "Svar C", value: "C", isCorrect: true },
      { text: "Svar D", value: "D", isCorrect: false },
    ],
    type: "multipleChoice",
  },
  {
    q: "Vad heter jag i mellannamn? Två rätta svar",
    a: [
      { text: "Elisabeth", value: "Elisabeth", isCorrect: false },
      { text: "Helena", value: "Helena", isCorrect: true },
      { text: "Kristina", value: "Kristina", isCorrect: true },
      { text: "Ingrid", value: "Ingrid", isCorrect: false },
    ],
    type: "checkbox",
  },
  {
    q: "Fråga här? Tre rätta svar",
    a: [
      { text: "Alt 1", value: "1", isCorrect: true },
      { text: "Alt 2", value: "2", isCorrect: true },
      { text: "Alt 3", value: "3", isCorrect: true },
      { text: "Alt 4", value: "4", isCorrect: false },
    ],
    type: "checkbox",
  },
  {
    q: "En till fråga här? Två rätta svar",
    a: [
      { text: "Alt 1", value: "1", isCorrect: false },
      { text: "Alt 2", value: "2", isCorrect: true },
      { text: "Alt 3", value: "3", isCorrect: false },
      { text: "Alt 4", value: "4", isCorrect: true },
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
let quizContent = document.querySelector("#quizContent");
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
    console.log(checkAnswers());
    showResults(checkAnswers());
  } else {
    warningMsg.innerText = "Du måste svara på alla frågor!";
  }
};

const constructQuiz = () => {
  questions.forEach((question, index) => {
    question.type === "trueOrFalse" || question.type === "multipleChoice"
      ? quizContent.append(buildRadioQuestion(question, index))
      : quizContent.append(buildCheckbox(question, index));
  });

  let msg = document.createElement("span");
  msg.classList.add("warning");
  let submitBtn = document.createElement("button");
  submitBtn.innerText = "Lämna in";
  submitBtn.setAttribute("id", "submitBtn");
  submitBtn.addEventListener("click", submitQuiz);

  quizContent.append(msg, submitBtn);
};

const buildRadioQuestion = (q, index) => {
  let div = document.createElement("div");
  div.dataset.id = index;
  div.classList.add("question");
  let text = document.createElement("span");
  text.innerText = q.q;
  div.append(text);

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
    div.append(aDiv);
  }

  return div;
};

const buildCheckbox = (q, index) => {
  let div = document.createElement("div");
  div.dataset.id = index;
  div.classList.add("question");
  let text = document.createElement("span");
  text.innerText = q.q;
  div.append(text);

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
    div.append(aDiv);
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

  let inputElements = document.querySelectorAll("#quizContent input");
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
  return (
    +input.parentElement.parentElement.dataset.id ===
    questions.indexOf(question)
  );
};

const showResults = (resultObj) => {
  let resultDiv = document.querySelector("#resultContent");
  resultDiv.innerHTML = "";

  resultObj.answers.forEach((result, index) => {
    let div = document.createElement("div");
    div.classList.add("result");
    let question = questions[index].q;
    let h3 = document.createElement("h3");
    h3.innerText = `${index + 1}. ${question}`;
    let answerDiv = document.createElement("div");
    let h4 = document.createElement("h4");
    let h5 = document.createElement("h5");
    h5.innerText = "Du svarade:";
    let ul = document.createElement("ul");
    if (result.isCorrect) {
      h4.innerText = "Rätt svar";
      h4.classList.add("correctAnswer");
    } else {
      h4.innerText = "Fel svar";
      h4.classList.add("wrongAnswer");
    }

    if (typeof result.answer === "array") {
      result.answer.forEach((answer) => {
        let li = document.createElement("li");
        li.innerText = answer;
        ul.append(li);
      });
    } else {
      let li = document.createElement("li");
      li.innerText = result.answer;
      ul.append(li);
    }

    answerDiv.append(h4, h5, ul);
    resultDiv.append(h3, answerDiv);
  });
};
