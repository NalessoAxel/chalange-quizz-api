const body = document.querySelector('body')
const container = document.createElement('div')
container.classList.add('container')
const title = document.createElement('h1')
title.textContent = 'Welcome on my Trivia Game'
const title2 = document.createElement('h2')
title2.textContent = 'Here is the game bro'
title2.classList.add('hide')
const containerQuestion = document.createElement('div')
containerQuestion.id = 'container-question'
containerQuestion.classList.add('hide')
const questionP = document.createElement('p')
questionP.id = 'question'
const containerAnswer = document.createElement('div')
containerAnswer.id = 'container-answer'
containerAnswer.classList.add('hide')
const controls = document.createElement('div')
controls.classList.add('controls')
const startBtn = document.createElement('button')
startBtn.id = 'start-btn'
startBtn.classList.add('start-btn')
startBtn.textContent = 'Start'
const containerLvlCat = document.createElement('div')
containerLvlCat.id = 'container-lvl-cat'
containerLvlCat.classList.add('hide')
const minuteur = document.querySelector('.minuteur')
minuteur.classList.add('hide')
const timer = document.querySelector('.timer')

minuteur.appendChild(timer)
body.appendChild(container)
container.appendChild(title)
container.appendChild(title2)
container.appendChild(containerQuestion)
container.appendChild(containerAnswer)
container.appendChild(controls)
controls.appendChild(startBtn)
container.appendChild(containerLvlCat)

window.onload = sendApiRequest()
startBtn.addEventListener('click', startGame)
function startGame() {
    let sec = 60;
    let interval = setInterval(function () {
        sec--;
        let min = Math.floor(sec / 60)
        timer.innerHTML = 'Timer : ' + (sec - (min * 60)) + ' sec'
        if (sec == 0) {
            clearInterval(interval)

            alert('Out of time bro!')
            window.location = ''
        }
    }, 1000)
    startBtn.classList.add('hide')
    containerQuestion.classList.remove('hide')
    containerAnswer.classList.add('hide')
    containerLvlCat.classList.remove('hide')
    title.classList.add('hide')
    title2.classList.remove('hide')
    minuteur.classList.remove('hide')
}

async function sendApiRequest() {
    let response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`)
    console.log(response);
    let data = await response.json()
    console.log(data);
    userApiData(data)
}
const button = ['answer1', 'answer2', 'answer3', 'answer4']

function userApiData(data) {

    const category = document.createElement("div")
    category.id = 'category'
    category.innerHTML = `Category: ${data.results[0].category}`
    containerLvlCat.appendChild(category)

    const difficulty = document.createElement("div")
    difficulty.innerHTML = `difficulty: ${data.results[0].difficulty}`
    containerLvlCat.appendChild(difficulty)

    const question = document.createElement("p")
    question.innerHTML = `Question: ${data.results[0].question}`
    containerQuestion.appendChild(question)

    for (let i = 0; i < button.length; i++) {
        
        const button = document.createElement('button')
        button.innerHTML = button[i]
        containerAnswer.appendChild(button)
        button.classList.add('btn')
    
    // button.innerHTML = data.results[0].correct_answer
    // button.innerHTML = data.results[0].incorrect_answers[0]   
    // button.innerHTML = data.results[0].incorrect_answers[1]
    // button.innerHTML = data.results[0].incorrect_answers[2]

    let rand = Math.floor(Math.random() * 4)

    if (rand == 0) {
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
    } else if (rand == 1) {
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
    } else if (rand == 2) {
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
    } else if (rand == 3) {
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
        containerAnswer.appendChild(button)
    }

    button.addEventListener('click', () => {
        if (button == data.results[0].correct_answer) {
            containerAnswer.innerHTML = ''
            containerLvlCat.innerHTML = ''
            containerQuestion.innerHTML = ''
            sendApiRequest()
        } else {
            button.style.backgroundColor = 'red'
        }
    })
}

}