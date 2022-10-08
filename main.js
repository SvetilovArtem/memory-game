const cards = document.querySelectorAll('.memory-card')
const modalWindow = document.querySelector('.start-game__window')
const startBtn = document.createElement('div')
let greetings = document.createElement('div')
let invitation = document.createElement('div')


function createModalWindow() {
    
    modalWindow.append(greetings)
    modalWindow.append(invitation)
    modalWindow.append(startBtn)

    for(let i = 0; i < 5; i++) {
        let str = document.createElement('span')
        str.innerHTML = ''
        startBtn.appendChild(str)
    }

    startBtn.classList.add('start-btn')
    greetings.classList.add('greetings')
    invitation.classList.add('invitation')

    startBtn.textContent = 'Start Game'
    greetings.innerHTML = 'Hello!'
    invitation.innerHTML = 'You have 1 minute to play.'
}
createModalWindow()

const block = document.querySelector('.blocked')
let hasFlippedCard = false
let boardLocked = false
let firstCard
let secondCard
const count = document.querySelector('.counter')
let sumSteps = 0

const flipCard = (e) => {

    if(boardLocked) {
        return
    }
    const clickedCard = e.target.parentElement
    clickedCard.classList.add('active')

    if(clickedCard === firstCard) return

    sumSteps++
    count.innerHTML = `Total number of steps: ${sumSteps}`

    if(!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = clickedCard
    } else {
        hasFlippedCard = false
        secondCard = clickedCard

        checkForMatch()
    }
}

let flipCardsCount = 0
const checkForMatch = () => {
    if(firstCard.dataset.picture === secondCard.dataset.picture) {
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)
        flipCardsCount++
        
        const gameOver = () => {
            if(flipCardsCount === cards.length / 2) {
                setTimeout(() => {
                    block.style.display = 'block'
                    greetings.innerHTML = 'Game over ...'
                    invitation.innerHTML = 'Come again ...'
                    startBtn.style.display = 'none'
                    modalWindow.classList.add('load')
                }, 1000)
            } else {
                setTimeout(() => {
                    block.style.display = 'block'
                    greetings.innerHTML = "Time's up"
                    invitation.innerHTML = 'Come again ...'
                    startBtn.style.display = 'none'
                    modalWindow.classList.add('load')
                }, 60000)
            }
        }
        gameOver()

    } else {
        boardLocked = true
        setTimeout(() => {
            firstCard.classList.remove('active')
            secondCard.classList.remove('active')
            boardLocked = false
        }, 1000)
        
    }
    
}
  
cards.forEach(card => {
    card.addEventListener('click', flipCard)
    
    const randomIndex = Math.floor(Math.random() * cards.length)
    card.style.order = randomIndex
})

const startGame = () => {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            modalWindow.classList.add('load')
        }, 1000)
        
    })
}
startGame();

startBtn.addEventListener('click', () => {
    startBtn.classList.add('clicked')
    
    setTimeout(() => {
        modalWindow.classList.remove('load')
        block.style.display = 'none'
    }, 1000)
    
})











