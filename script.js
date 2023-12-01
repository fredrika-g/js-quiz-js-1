const questions = [
  {
    q: "This is either true or false",
    a: [
      { text: "Sant", isCorrect: true },
      { text: "Falskt", isCorrect: false },
    ],
    type: "trueOrFalse",
  },
  {
    q: "Second true/false question",
    a: [
      { text: "Sant", isCorrect: true },
      { text: "Falskt", isCorrect: false },
    ],
    type: "trueOrFalse",
  },
  {
    q: "Third true/false question",
    a: [
      { text: "Sant", isCorrect: false },
      { text: "Falskt", isCorrect: true },
    ],
    type: "trueOrFalse",
  },
  {
    q: "Fourth true/false question",
    a: [
      { text: "Sant", isCorrect: true },
      { text: "Falskt", isCorrect: false },
    ],
    type: "trueOrFalse",
  },
  {
    q: "Vad heter jag?",
    a: [
      { text: "Sara", isCorrect: false },
      { text: "Fredrika", isCorrect: true },
      { text: "Märta", isCorrect: false },
      { text: "Gabriella", isCorrect: false },
    ],
    type: "multipleChoice",
  },
  {
    q: "Hur gammal är jag?",
    a: [
      { text: "25", isCorrect: true },
      { text: "23", isCorrect: false },
      { text: "24", isCorrect: false },
      { text: "27", isCorrect: false },
    ],
    type: "multipleChoice",
  },
  {
    q: "Svara rätt",
    a: [
      { text: "Svar A", isCorrect: false },
      { text: "Svar B", isCorrect: false },
      { text: "Svar C", isCorrect: true },
      { text: "Svar C", isCorrect: false },
    ],
    type: "multipleChoice",
  },
  {
    q: "Vad heter jag i mellannamn? Två rätta svar",
    a: [
      { text: "Elisabeth", isCorrect: false },
      { text: "Helena", isCorrect: true },
      { text: "Kristina", isCorrect: true },
      { text: "Ingrid", isCorrect: false },
    ],
    type: "checkbox",
  },
  {
    q: "Fråga här? Tre rätta svar",
    a: [
      { text: "Alt 1", isCorrect: true },
      { text: "Alt 2", isCorrect: false },
      { text: "Alt 3", isCorrect: true },
      { text: "Alt 4", isCorrect: false },
    ],
    type: "checkbox",
  },
  {
    q: "En till fråga här? Två rätta svar",
    a: [
      { text: "Alt 1", isCorrect: false },
      { text: "Alt 2", isCorrect: true },
      { text: "Alt 3", isCorrect: false },
      { text: "Alt 4", isCorrect: true },
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
    console.log("all answered");
  } else {
    warningMsg.innerText = "Du måste svara på alla frågor!";
  }
};

// check answers + show results

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
    label.innerText = answer;
    label.setAttribute("for", `${answer}${index}`);
    let radioBtn = document.createElement("input");
    radioBtn.setAttribute("type", "radio");
    radioBtn.setAttribute("value", answer);
    radioBtn.setAttribute("id", `${answer}${index}`);
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
    label.innerText = answer;
    label.setAttribute("for", `${answer}${index}`);
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("value", answer);
    checkbox.setAttribute("id", `${answer}${index}`);
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
  let checkedRadios = document.querySelectorAll("[type='radio']:checked");
  let checkedBoxes = document.querySelectorAll("[type='checkbox']:checked");

  let score = 0;

  questions.forEach((question) => {});
};
