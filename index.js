let deckId
const cardsContainer = document.getElementById("cards")
const newDDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
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
           cardsContainer.children[0].innerHTML =
                `
                  <img src=${data.cards[0].image} class="card" alt="deck of cards">
                `
            cardsContainer.children[1].innerHTML =
                `
                  <img src=${data.cards[1].image} class="card"  alt="deck of cards">
                `
        })
})