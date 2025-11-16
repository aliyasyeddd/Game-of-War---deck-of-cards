let deckId
const cardsContainer = document.getElementById("cards")
const newDDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById('header')
const remainingCards = document.getElementById("remaining-cards")


function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
                        remainingCards.textContent = `Remaining cards: ${data.remaining}`
            deckId = data.deck_id
            return deckId
        }
        )
}

newDDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(` https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
                        remainingCards.textContent = `Remaining cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML =
                `
                  <img src=${data.cards[0].image} class="card" alt="deck of cards">
                `
            cardsContainer.children[1].innerHTML =
                `
                  <img src=${data.cards[1].image} class="card"  alt="deck of cards">
                `
            header.textContent = determineCardWinner(data.cards[0], data.cards[1])
            if (data.remaining === 0) {
                drawCardBtn.disabled = true
            }
        })
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
        "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        return "You win!"
    } else {
        return "War!"
    }
}