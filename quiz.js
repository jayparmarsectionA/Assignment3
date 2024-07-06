// quiz questions and answers
const quizData = [
    {
        question: "Which planet is closest to the sun?",
        options: ["a) Venus", "b) Mercury", "c) pluto", "d) Mars"],
        answer: "b) Mercury"
    },
    {
        question: "Which planet is known as the dwarf Planet?",
        options: ["a) Mercury", "b) Mars", "c) Pluto", "d) Venus"],
        answer: "c) Pluto"
    },
    {
        question: "In which galaxy is solar system located?",
        options: ["a) Milky Way", "b) Andromeda", "c) Triangulum", "d) Antennae"],
        answer: "a) Milky Way"
    },
    {
        question: "What is the age of Universe in billion years?",
        options: ["a) 11.3", "b) 4.2", "c) 13.8", "d) 15.6"],
        answer: "c) 13.8"
    },
    {
        question: "Which entity has infinite gravitational pull?",
        options: ["a) Pulsar", "b) Neutron Star", "c) White Dwarf", "d) Black Hall"],
        answer: "d) Black Hall"
    }
];

// Initialize quiz variables
let currentQuestion = 0;
let score = 0;

let isAuthenticated = false;

// Function to start quiz
function startQuiz() {
    if (!isAuthenticated) {
        alert("You need to log in to start the quiz!");
        return;
    }
    showQuestion();
}

// Function to display current question and options
function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const currentQuizData = quizData[currentQuestion];

    questionElement.textContent = currentQuizData.question;
    optionsElement.innerHTML = '';

    currentQuizData.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', selectAnswer);
        optionsElement.appendChild(button);
    });
}

// Function to handle answer selection
function selectAnswer(event) {
    const selectedOption = event.target.textContent;
    const currentQuizData = quizData[currentQuestion];

    if (selectedOption === currentQuizData.answer) {
        score++;
        showFeedback("Correct!", true);
    } else {
        showFeedback("Wrong!", false);
    }

    // Disable further clicks on options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.removeEventListener('click', selectAnswer);
        option.disabled = true;
    });

    // Increment current question counter
    currentQuestion++;

    // Display next question or end quiz
    if (currentQuestion < quizData.length) {
        setTimeout(showQuestion, 1000); // Delay to show feedback before next question
    } else {
        endQuiz();
    }

    // Updates score
    document.getElementById('scoreValue').textContent = score;
}

// Function to display feedback message
function showFeedback(message, isCorrect) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = message;
    feedbackElement.style.color = isCorrect ? 'green' : 'red';
}

// Function to end quiz and display final score
function endQuiz() {
    const quizForm = document.getElementById('quizForm');
    const scoreElement = document.getElementById('score');
    quizForm.style.display = 'none';
    scoreElement.textContent = `Final Score: ${score} / ${quizData.length}`;
    scoreElement.style.fontWeight = 'bold';
}

// Fake authentication 
isAuthenticated = true;

// Starts quiz when the page loads
document.addEventListener('DOMContentLoaded', startQuiz);
