let questions = [
    {
        ques: "How many bananas do you buy in a month?",
        ans: [
            "None",
            "1 to 12",
            "13 to 24",
            "25 or more"
        ],
        wrongans : 0
    },
    {
        ques: "Where do you like to enjoy your bananas?",
        ans: [
            "On the go",
            "At Home"
        ]
    },
    {
        ques: "Which banana do you prefer?",
        ans: [
            "Black",
            "Ripe",
            "Fresh"
        ],
        wrongans : 2
    },
    {
        ques: "Do you share your bananas?",
        ans: [
            "Yes",
            "No"
        ]
    },
    {
        ques: "Have you tried banana flavoured snacks?",
        ans: [
            "Yes",
            "No"
        ],
        wrongans : 1
    },
    {
        ques: "Do you use any toppings on your bananas?",
        ans: [
            "Yes",
            "No",
            "Maybe"
        ]
    },
    {
        ques: "Frozen bananas or grilled?",
        ans: [
            "Frozen",
            "Grilled",
            "None"
        ]
    },
    {
        ques: "Would you stew your bananas?",
        ans: [
            "Yes",
            "No"
        ]
    },
    {
        ques: "Do you think you waste your bananas?",
        ans: [
            "Yes",
            "No"
        ]
    }
]



const question = document.getElementById('question')
const answers = document.querySelectorAll('#game form label')
const ansInput = document.querySelectorAll('#game form input[type="radio"]')
let qNum = 0
let notAnsweredQnum = null
localStorage.removeItem('quiz')

const loadQuiz = () => {
    let dataQuiz = JSON.parse(localStorage.getItem('quiz'))
    if (!dataQuiz) {
        dataQuiz = questions
    }

    question.textContent = dataQuiz[qNum].ques
    answers.forEach((ans, index) => {
        if (dataQuiz[qNum].ans[index]) {
            ans.style.display = "block"
            ans.textContent = dataQuiz[qNum].ans[index]
        }
        else {
            ans.style.display = "none"
        }
    })
    ansInput.forEach((radio) => {
        radio.checked = false
    })

    const answerChoosen = dataQuiz[qNum].ansChs
    if (answerChoosen != undefined) {
        ansInput[answerChoosen].checked = true
    }
}

loadQuiz()

const saveQuiz = () => {
    let answerChoosen = null
    ansInput.forEach((ans, index) => {
        if (ans.checked) {
            answerChoosen = index
        }
    })

    let dataQuiz = JSON.parse(localStorage.getItem('quiz'))
    if (!dataQuiz) {
        dataQuiz = questions
    }

    if(dataQuiz[qNum].wrongans != undefined){
        if(dataQuiz[qNum].wrongans == answerChoosen){
            window.location.href = "./end.html"
        }
    }

    if (answerChoosen == null) {
        notAnsweredQnum = notAnsweredQnum != null ? notAnsweredQnum : qNum
    }
    else {
        dataQuiz[qNum].ansChs = answerChoosen
    }

    localStorage.setItem('quiz', JSON.stringify(dataQuiz))

    setTimeout(() => {
        if (qNum == questions.length - 1) {
            if (notAnsweredQnum == null) {
                window.location.href = "./data.html"
            }
            else {
                window.confirm("You Haven't answered some questions")
                qNum = notAnsweredQnum
                notAnsweredQnum = null
                loadQuiz()
            }
        }
        else {
            qNum++
            loadQuiz()
        }
    }, 100);
}

