//DOM ELEMENTS
let draw = document.querySelector('#flip')
let msg1 = document.querySelector('#msg1')
let msg2 = document.querySelector('#msg2')
let resetBtn = document.querySelector('#reset')
let p1Wins = document.querySelector('#p1Wins')
let p2Wins = document.querySelector('#p2Wins')
let rounds = document.querySelector('#rounds')
let p1Deck = document.querySelector('#p1D')
let p2Deck = document.querySelector('#p2D')

let p1ValT= document.querySelector('.p1ValT')
let p1ValB = document.querySelector('.p1ValB')

let p1SuT = document.querySelector('.p1SuT')
let p1SuM = document.querySelector('.p1SuM')
let p1SuB = document.querySelector('.p1SuB')

let p2ValT = document.querySelector('.p2ValT')
let p2ValB = document.querySelector('.p2ValB')

let p2SuT = document.querySelector('.p2SuT')
let p2SuM = document.querySelector('.p2SuM')
let p2SuB = document.querySelector('.p2SuB')



//Card Info
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
let suits = ['♣','♥', '♠','◆']
let cardDeck = []
let shuffledDeck = []
let playerOneDeck = []
let playerTwoDeck = []
let curCardPlayer1 = 0;
let curCardPlayer2 = 0
let playerOneWins = 0
let playerTwoWins = 0
let playerOneWinner = 0
let playerOneLosts = 0
let whoWon = ""
let howManyRounds = 0
let theWinner = ""

//Functions
//create the deck
function createDeck(){
  values.forEach(val => {
    suits.forEach(suit => {
      let card = {
        value: val,
        suit: suit
      }
      cardDeck.push(card)
    })
  })
}

//shuffle the deck
function shuffleTheDeck(cardDeck){

  while(cardDeck.length > 0){
    let randomIndex = Math.floor(Math.random() * (cardDeck.length - 1))
    shuffledDeck.push(cardDeck[randomIndex])
    cardDeck.splice(randomIndex, 1)
  }
  console.log(shuffledDeck.length)

}

//start the game
function startGame(){
  shuffleTheDeck(cardDeck)
  playerOneDeck = shuffledDeck.slice(0, (shuffledDeck.length/2))
  playerTwoDeck = shuffledDeck.slice(shuffledDeck.length/2)
  console.log(playerOneDeck.length, playerTwoDeck.length)
}

//draw the card
function drawCard(){
  howManyRounds++
  msg2.innerText = ""
  let p1CurCard = playerOneDeck[curCardPlayer1]
  let p2CurCard = playerTwoDeck[curCardPlayer2]
  console.log("cur Index/Card", curCardPlayer1, curCardPlayer2, p1CurCard, p2CurCard)
  whoWon = findWinner(p1CurCard, p2CurCard)

  p1ValT.innerText = p1CurCard.value
  p1ValB.innerText = p1CurCard.value
  p1SuT.innerText = p1CurCard.suit
  p1SuM.innerText = p1CurCard.suit
  p1SuB.innerText = p1CurCard.suit

  p2ValT.innerText = p2CurCard.value
  p2ValB.innerText = p2CurCard.value
  p2SuT.innerText = p2CurCard.suit
  p2SuM.innerText = p2CurCard.suit
  p2SuB.innerText = p2CurCard.suit


  rounds.innerText = howManyRounds
  msg1.innerText = 'Player1 draws ' + p1CurCard.value + p1CurCard.suit + " and Player2 draws " + p2CurCard.value + p2CurCard.suit + ". The winner is " + whoWon + "!"
  p1Wins.innerText = playerOneWins
  p2Wins.innerText = playerTwoWins
  console.log(playerOneDeck.length, playerTwoDeck.length)
  p1Deck.innerText = playerOneDeck.length
  p2Deck.innerText = playerTwoDeck.length
  resetCurCard()
  gameOver()

}

//who is the findWinner
function findWinner(p1CurCard, p2CurCard){
  let p1IndexCard = values.indexOf(p1CurCard.value)
  let p2IndexCard = values.indexOf(p2CurCard.value)
  console.log("indexofvalues", p1IndexCard, p2IndexCard)

  if(p1IndexCard > p2IndexCard){
    playerTwoDeck.splice(curCardPlayer2, 1)
    playerOneDeck.push(p2CurCard)
    playerOneWins++
    curCardPlayer1++
    return "player 1"
  } else if(p1IndexCard < p2IndexCard){
    playerOneDeck.splice(curCardPlayer1, 1)
    playerTwoDeck.push(p1CurCard)
    playerTwoWins++
    curCardPlayer2++
    return "player 2"
  } else if(p1IndexCard === p2IndexCard){
    msg2.innerText = "There's been a Tie!"
    let tieCurCard = 2
    let pOne2ndCard = 0
    let p1TieIndexCard = p1IndexCard
    let pTwo2ndCard = 0
    let p2TieIndexCard = p2IndexCard
    let memory1 = [p1CurCard]
    let memory2 = [p2CurCard]
    console.log("mem", memory1, memory2
    )
    console.log(p1TieIndexCard, p2TieIndexCard)
    while(p1TieIndexCard === p2TieIndexCard){
      //if the current index = to the number of cards, it wont find it
      if((curCardPlayer1 + tieCurCard) >= playerOneDeck.length){
        curCardPlayer1 = 0
        console.log(curCardPlayer1, "curP1")
      } else if((curCardPlayer2 + tieCurCard) >= playerTwoDeck.length){
        curCardPlayer2 = 0
        console.log(curCardPlayer2, "curP2")
      }
      //find the 2nd card
      pOne2ndCard = playerOneDeck[curCardPlayer1 + tieCurCard]
      pTwo2ndCard = playerTwoDeck[curCardPlayer2 + tieCurCard]
      console.log(pOne2ndCard, pTwo2ndCard)
      //find index of the card in the values array
      p1TieIndexCard = values.indexOf(pOne2ndCard.value)
      p2TieIndexCard = values.indexOf(pTwo2ndCard.value)
      console.log(p1TieIndexCard, p2TieIndexCard)
      p1ValT.innerText = pOne2ndCard.value
      p1ValB.innerText = pOne2ndCard.value
      p1SuT.innerText = pOne2ndCard.suit
      p1SuM.innerText = pOne2ndCard.suit
      p1SuB.innerText = pOne2ndCard.suit

      p2ValT.innerText = pTwo2ndCard.value
      p2ValB.innerText = pTwo2ndCard.value
      p2SuT.innerText = pTwo2ndCard.suit
      p2SuM.innerText = pTwo2ndCard.suit
      p2SuB.innerText = pTwo2ndCard.suit
      msg3.innerText = 'Player1 draws ' + pOne2ndCard.value + pOne2ndCard.suit + " and Player2 draws " + pTwo2ndCard.value + pTwo2ndCard.suit
      if(p1TieIndexCard > p2TieIndexCard){
        memory2.push(playerTwoDeck[curCardPlayer2 + tieCurCard - 1],pTwo2ndCard)
        console.log(memory2)
        playerOneDeck = playerOneDeck.concat(memory2)
        console.log(playerTwoDeck.splice(curCardPlayer2, tieCurCard + 1))
        playerOneWins++
        curCardPlayer1++
        console.log(playerOneDeck.length, playerTwoDeck.length)
        return "player 1 "
      } else if(p1TieIndexCard < p2TieIndexCard){
        memory1.push(playerOneDeck[curCardPlayer1 + tieCurCard - 1],pOne2ndCard)
        console.log(memory1)
        playerTwoDeck = playerTwoDeck.concat(memory1)
        console.log(playerOneDeck.splice(curCardPlayer1, tieCurCard + 1))
        playerTwoWins++
        curCardPlayer2++
        console.log(playerOneDeck.length, playerTwoDeck.length)
        return "player 2"
      } else if(p1TieIndexCard === p2TieIndexCard){
        memory1.push(playerOneDeck[curCardPlayer2 + tieCurCard - 1],pOne2ndCard)
        memory2.push(playerTwoDeck[curCardPlayer2 + tieCurCard - 1],pTwo2ndCard)
        tieCurCard++
        tieCurCard++
        msg2.innerText = "Another Tie! Player1 draws " + pOne2ndCard + " and Player2 draws " + pTwo2ndCard + "!"
        console.log("tieCur", tieCurCard)
      }
    }
  }
}




//reset the curcards to start at the beg
function resetCurCard(){
  if(playerOneDeck.length === curCardPlayer1){
    curCardPlayer1 = 0
    console.log(curCardPlayer1, "curp12")
  } else if(playerTwoDeck.length === curCardPlayer2){
    curCardPlayer2 = 0
    console.log(curCardPlayer2, "curp22")
  }
}

//is the game over
function gameOver(){
  if(playerOneDeck.length === 0 || playerTwoDeck.length === 0 || howManyRounds === 15){
    if(playerOneWins > playerTwoWins){
      playerOneWinner++
      theWinner = "Player1"
      msg2.innerText = "Player1 Wins! Gameover!"
       console.log("Player1 Wins! Gameover!")
    } else if(playerOneWins < playerTwoWins){
      playerOneLosts++
      theWinner = 'Player2'
      msg2.innerText = "Player1 Lost! Gameover!"
      console.log("Player2 Wins! Gameover!")
    } else if(playerOneWins === playerTwoWins){
      console.log("its a tie")
      theWinner = 'Tie'
    }
    draw.removeEventListener('click', drawCard)
    fetch('messages', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'theWinner': theWinner,
        'howManyRounds': howManyRounds,
        'playerOneWins': playerOneWins,
        'playerTwoWins': playerTwoWins
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      // window.location.reload(true)
    })
  }

}

function resetGame(){
  p1CurCard = 0
  p2CurCard = 0
  playerOneWins = 0
  playerTwoWins = 0
  theWinner = 0
  howManyRounds = 0
  playerOneWins = 0
  playerTwoWins = 0
  p1Wins.innerText = ""
  p2Wins.innerText = ""
  rounds.innerText = ""
  msg2.innerText = ""
  msg1.innerText = ""
  draw.addEventListener('click', drawCard)
  startGame()
}

//Init
//All before game starts, cards are created and shuffled and split in the half
//1. Create Deck
createDeck()
//2.shuffled the cards and split them in half
startGame()
//console.log(playerOneDeck.length, playerTwoDeck.length)
//console.log(playerOneDeck, playerTwoDeck)

//Event Listeners
//1.
draw.addEventListener('click', drawCard)
//2.
resetBtn.addEventListener('click', resetGame)
