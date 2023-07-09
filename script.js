const questions = [
    {
        question: "What is encapsulation in OOP?",
        answers: [
            {text: "The process of combining data and methods into a single unit", correct: true },
            {text: "The process of defining multiple classes in a single file", correct: false },
            {text: "The process of converting code into machine language", correct: false },
            {text: "The process of creating objects from classes", correct: false },
        ]
    },
    {
        question: "What is inheritance in OOP?",
        answers: [
            {text: "The process of hiding data within a class", correct: false },
            {text: "The process of creating new instances of a class", correct: false },
            {text: "The process of defining a new class from an existing one", correct: true },
            {text: " The process of converting objects into data", correct: false },
        ]
    },
    {
        question: "What is polymorphism in OOP?",
        answers: [
            {text: "The process of breaking down a program into smaller parts", correct: false },
            {text: "The process of creating multiple methods with the same name but different parameters", correct: true },
            {text: "The process of converting code into an executable file", correct: false },
            {text: " The process of combining data and methods into a single unit", correct: false },
        ]
    },
    {
        question: "What is an object in OOP?",
        answers: [
            {text: "A variable used to store data", correct: false },
            {text: "A template for creating classes", correct: false },
            {text: "A block of code that performs a specific task", correct: false },
            {text: "An instance of a class", correct: true },
        ]
    },
    {
        question: "What is a constructor in OOP?",
        answers: [
            {text: "A method used to destroy objects", correct: false },
            {text: "A method used to create objects", correct: true },
            {text: "A method used to modify objects", correct: false },
            {text: "A method used to access class members", correct: false },
        ]
    }

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =  answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if (button.dataset.correct==="true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();