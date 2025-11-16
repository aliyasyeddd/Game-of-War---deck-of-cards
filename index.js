let deckId

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            return deckId
        }
        )
}

document.getElementById("new-deck").addEventListener("click", handleClick)

document.getElementById("draw-cards").addEventListener("click", () => {
    fetch(` https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("cards").children[0].innerHTML =
                `
              <img src=${data.cards[0].image} class="card" alt="deck of cards">
              <img src=${data.cards[1].image}class="card"  alt="deck of cards">
           `
        })
})