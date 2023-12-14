var questions = [
    {
        question: "Which of the following are built-in terminal commands used for navigating your computer's file system and completing base-level tasks?",
        answers: [
            {text: "mj, skl, ol, ps, ink", correct: false},
            {text: "cp, rm, touch, ls, pwd", correct: true},
            {text: "brb, idk, kk, omw, wyd", correct: false},
            {text: "dvd, dl, feel, create, no", correct: false},
        ]
    },
    {
        question: "Which of the following is NOT associated with creating or deploying a GitHub repository?",
        answers: [
            {text: "changing background color", correct: true},
            {text: "Pages", correct: false},
            {text: "HTTPS link / SSH Key", correct: false},
            {text: "README", correct: false},
        ]
    },
    {
        question: "What is the correct way to declare a new variable in CSS",
        answers: [
            {text: "var rounded-border = 10px;", correct: false},
            {text: "--rounded-border: 10px;", correct: true},
            {text: "var(--rounded-border);", correct: false},
            {text: "var border-radius: 10px;", correct: false},
        ]
    },
    {
        question: "What is the point of a CSS reset stylesheet?",
        answers: [
            {text: "to reset the current CSS stylesheet so you can start it from scratch", correct: false},
            {text: "to clear the browser's default formatting of HTML elements and remove potential inconsistencies between different browsers", correct: true},
            {text: "a second CSS file used to a different page on the website so that the original stylesheet doesn't get too crowded", correct: false},
            {text: "a life reset for when you're having a bad day", correct: false},
        ]
    },
    {
        question: "Which is the correct way to link your JavaScript file to your project?",
        answers: [
            {text: "it must be linked in the head of your HTML file using the <link> tag and 'href' attribute", correct: false},
            {text: "VSCode automatically knows to link your script file as long as it is properly placed in the assets folder of your project", correct: false},
            {text: "place a script property at the bottom of your CSS stylesheet and link it using a src attribute", correct: false},
            {text: "place a script tag with a src attribute linking to your script file at bottom of the body section of your HTML", correct: true},
        ]
    },
    {
        question: "What is the correct format of a forLoop?",
        answers: [
            {text: "(incrementor ; string ; condition)", correct: false},
            {text: "(loop; boolean; argument)", correct: false},
            {text: "(initial expression/counter; condition; incrementor)", correct: true},
            {text: "(function value; variable item; conditionals)", correct: false},
        ]
    },
    {
        question: "What is the proper format for writing an array in JavaScript?",
        answers: [
            {text: "var array = ['item-1', 'item-2', 'item-3'];", correct: true},
            {text: "var array = {value: 'item-1', property: 'item-2', element: 'item-3'};", correct: false},
            {text: "var array = 'array';", correct: false},
            {text: "if [array] = var [array, array-1] it is an array else false;", correct: false},
        ]
    },
    {
        question: "What method allows you to select all of the specified group of elements?",
        answers: [
            {text: "getElementById()", correct: false},
            {text: "querySelectorAll()", correct: true},
            {text: "$(<div>)", correct: false},
            {text: "var = document.select", correct: false},
        ]
    },
    {
        question: "Which of these events do event listeners NOT listen for?",
        answers: [
            {text: "mouse events", correct: false},
            {text: "keyboard events", correct: false},
            {text: "window events", correct: false},
            {text: "wedding events", correct: true},
        ]
    },
    {
        question: "What is jQuery?",
        answers: [
            {text: "a JavaScript library that definitely does not use dollar signs", correct: false},
            {text: "a JavaScript question generator", correct: false},
            {text: "a lightweight, 'write less, do more', JavaScript library", correct: true},
            {text: "a movement that pushes developers to code in vanilla JavaScript", correct: false},
        ]
    },   

];
var questionElement = document.getElementById("question");
        var answerButtonElement = document.getElementById("answer-buttons");
        var nextButton = document.getElementById("next-button");
        var scoreElement = document.getElementById("score");
        var initialsContainer = document.getElementById("initials-container");
        var initialsInput = document.getElementById("initials");
        var saveButton = document.getElementById("save-button");

        var currentQuestionIndex = 0;
        var score = 0;
        var timer;
        var timeLeft = 60; // Set your desired initial time limit in seconds

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            timeLeft = 60;
            nextButton.innerHTML = "Next";
            showQuestion();
            startTimer();
        }

        function startTimer() {
            timer = setInterval(function () {
                timeLeft--;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    endGame();
                }
            }, 1000);
        }

        function showQuestion() {
            resetState();
            var currentQuestion = questions[currentQuestionIndex];
            var questionNumber = currentQuestionIndex + 1;
            questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

            currentQuestion.answers.forEach(answer => {
                var button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("button");
                answerButtonElement.appendChild(button);
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener("click", selectAnswer);
            });
        }

        function resetState() {
            nextButton.style.display = "none";
            while (answerButtonElement.firstChild) {
                answerButtonElement.removeChild(answerButtonElement.firstChild);
            }
        }

        function showScore() {
            scoreElement.innerHTML = "Score: " + score + " /10";
        }

        function endGame() {
            clearInterval(timer);
            questionElement.innerHTML = "Game Over!";
            answerButtonElement.innerHTML = "";
            nextButton.style.display = "none";
            initialsContainer.style.display = "block";
            showScore();
        }

        function saveScore() {
            var initials = initialsInput.value.trim().toUpperCase();
            if (initials !== "") {
                // Save the score and initials (you can use localStorage, server-side storage, etc.)
                alert("Score saved! Initials: " + initials + ", Score: " + score);
            } else {
                alert("Please enter your initials.");
            }
        }

        function nextQuestion() {
            clearInterval(timer);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
                startTimer();
            } else {
                endGame();
            }
        }

        function selectAnswer(e) {
            var selectedButton = e.target;
            var isCorrect = selectedButton.dataset.correct === "true";
            if (isCorrect) {
                selectedButton.classList.add("correct");
                score++;
                nextButton.style.display = "block";
            } else {
                selectedButton.classList.add("incorrect");
                timeLeft -= 5; // Deduct 5 seconds for incorrect answers
                nextButton.style.display = "block";
            }
            Array.from(answerButtonElement.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct1");
                }
                button.disabled = true;
            });
        }

        saveButton.addEventListener("click", saveScore);
        nextButton.addEventListener("click", nextQuestion);

        startQuiz();