const questions = {
  one: [
    {
      img: "src/images/pencil.svg",
      title: "What is this?",
      answers: [
        { title: "pencil", correct: true },
        { title: "bench", correct: false },
        { title: "lap top", correct: false },
        { title: "ball", correct: false },
      ],
    },
    {
      img: "src/images/math.png",
      title: "What is 2 + 2?",
      answers: [
        { title: "3", correct: false },
        { title: "4", correct: true },
        { title: "5", correct: false },
        { title: "6", correct: false },
      ],
    },
    {
      img: "src/images/no-image.jpg",
      title: "who am i?",
      answers: [
        { title: "elyas", correct: false },
        { title: "abbas", correct: false },
        { title: "mahdi", correct: true },
        { title: "reza", correct: false },
      ],
    },
  ],
  two: [
    {
      img: "src/images/crown.png",
      title: "who's the king?",
      answers: [
        { title: "ragnar", correct: true },
        { title: "denerys", correct: false },
        { title: "john snow", correct: false },
        { title: "tommy shalby", correct: false },
      ],
    },
    {
      img: "src/images/math.png",
      title: "What is √25 (radical)?",
      answers: [
        { title: "25", correct: false },
        { title: "9", correct: false },
        { title: "5", correct: true },
        { title: "2", correct: false },
      ],
    },
    {
      img: "src/images/god.jpg",
      title: "who's the god?",
      answers: [
        { title: "allah", correct: false },
        { title: "jesus", correct: false },
        { title: "abbas", correct: true },
        { title: "Moses", correct: false },
      ],
    },
  ],
  three: [
    {
      img: "src/images/kotlet.jpg",
      title: "what does every corner of my heart says?",
      answers: [
        { title: "ya ghasem", correct: false },
        { title: "ya imam reza", correct: true },
        { title: "ya fateme zahra", correct: false },
        { title: "ya hossein", correct: false },
      ],
    },
    {
      img: "src/images/LGBT.png",
      title: "are you gay?",
      answers: [
        { title: "yes", correct: true },
        { title: "yes", correct: true },
        { title: "yes", correct: true },
        { title: "yes", correct: true },
      ],
    },
    {
      img: "src/images/LGBT.png",
      title: "does your dad know you'r gay?",
      answers: [
        { title: "yes", correct: true },
        { title: "no", correct: true },
        { title: "yes", correct: true },
        { title: "no", correct: true },
      ],
    },
  ],
};

// elements and variables
const homePageContainer = document.querySelector(".container");
const questionsContainer = document.querySelector(".app");
const chooseLevelBtn = document.querySelectorAll(".choose-lvl");
const answersActionContainer = document.querySelector(".app__answers");
const questionTitle = document.querySelector(".app__question__title");
const questionImg = document.querySelector(".qu-img");
const gameoverContainer = document.querySelector(".gameover");
const timelineContainer = document.querySelector(".app__head__time-line");
const timelinePercentage = document.querySelector(".timelinePercentage");
const gameoverDescription = document.querySelector(".gameover__main__desc");
const gameoverTitle = document.querySelector(".gameover__main__title");
const starsElem = document.querySelectorAll(".star");
const nextLevelBtn = document.querySelector(".next-level");
const goHomeBtn = document.querySelector(".go-home");

let numSum = ["one", "two", "three"];
let currQuestionIndex = 0;
let score = 0;
let levelQuestions;
let currLevel;
let time;
let timerTimeout;
let timerInterval;

// functions
const showAndHiddenContainer = (hidden, show) => {
  hidden.classList.add("hidden");
  show.classList.remove("hidden");
};
const clearTimerInterval = timer => clearInterval(timer);
const clearTimerTimeout = timer => clearTimeout(timer);
const showMessage = (el, message) => (el.innerHTML = message);
const chooseLevel = (chosenLevel, chosenLevelnum) => {
  levelQuestions = questions[chosenLevel];
  currLevel = chosenLevelnum;
  currLevel == "1"
    ? (time = 5000)
    : currLevel == "2"
    ? (time = 4000)
    : currLevel == "3"
    ? (time = 3000)
    : (time = 5000);
  showAndHiddenContainer(homePageContainer, questionsContainer);
  renderQuestions(levelQuestions, currQuestionIndex);
};
const renderQuestions = (questions, currQuestion) => {
  answersActionContainer.innerHTML = "";
  nextQuestion(questions[currQuestion]);
};
const startTimeline = () => {
  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds += 10;
    timelinePercentage.style.width = `${(seconds / time) * 100}%`;
  }, 10);
  timerTimeout = setTimeout(() => {
    clearTimerInterval(timerInterval);
    currQuestionIndex += 1;
    currQuestionIndex == levelQuestions.length
      ? gameOver()
      : renderQuestions(levelQuestions, currQuestionIndex);
  }, time);
};
const nextQuestion = currQuestion => {
  questionTitle.innerHTML = currQuestion.title;
  questionImg.src = currQuestion.img;
  const answersFragment = document.createDocumentFragment();
  currQuestion.answers.forEach(answer => {
    const btnElem = document.createElement("btn");
    btnElem.className = "btn btn--answer";
    btnElem.innerHTML = answer.title;
    btnElem.dataset.value = answer.title;
    btnElem.addEventListener("click", event => checkAnswer(event));
    answersFragment.append(btnElem);
  });
  answersActionContainer.append(answersFragment);
  startTimeline();
};
const checkAnswer = event => {
  const { target } = event;
  const userAnswer = target.dataset.value;
  const findUserAnswerInDB = levelQuestions[currQuestionIndex].answers.find(
    answer => answer.title == userAnswer
  );
  if (findUserAnswerInDB.correct) {
    score += 1;
    target.classList.add("btn--true");
  } else {
    target.classList.add("btn--false");
  }
  currQuestionIndex += 1;
  !(currQuestionIndex == levelQuestions.length)
    ? setTimeout(() => renderQuestions(levelQuestions, currQuestionIndex), 500)
    : setTimeout(gameOver, 500);
  clearTimerTimeout(timerTimeout);
  clearTimerInterval(timerInterval);
};
const gameOver = () => {
  showAndHiddenContainer(questionsContainer, gameoverContainer);
  const questionsCount = currQuestionIndex;
  const correctAnswersPercent = Math.floor((score / questionsCount) * 100);
  gameoverDescription.innerHTML = `you got ${score} of ${questionsCount}`;
  if (correctAnswersPercent <= 0) {
    showMessage(gameoverTitle, "Awful :(");
    return;
  } else if (correctAnswersPercent <= 33) {
    showMessage(gameoverTitle, "not bad :|");
    starsElem[0].src = "src/images/filled.svg";
  } else if (correctAnswersPercent <= 66) {
    showMessage(gameoverTitle, "good :)");
    starsElem[0].src = "src/images/filled.svg";
    starsElem[1].src = "src/images/filled.svg";
  } else if (correctAnswersPercent <= 100) {
    showMessage(gameoverTitle, "Good Game Bro ;)");
    starsElem.forEach(element => (element.src = "src/images/filled.svg"));
  }
};
const nextLevel = () => {
  gameoverContainer.classList.add("hidden");
  currLevel = +currLevel + 1;
  currQuestionIndex = 0;
  score = 0;
  numSum[currLevel - 1]
    ? chooseLevel(numSum[currLevel - 1], +currLevel)
    : alert(`There is no level ${currLevel} ;D`);
};
const goToHome = () => {
  currQuestionIndex = 0;
  score = 0;
  showAndHiddenContainer(gameoverContainer, homePageContainer);
};

// event listeners
chooseLevelBtn.forEach(element =>
  element.addEventListener("click", event =>
    chooseLevel(event.target.dataset.level, event.target.dataset.levelnum)
  )
);
nextLevelBtn.addEventListener("click", nextLevel);
goHomeBtn.addEventListener("click", goToHome);
