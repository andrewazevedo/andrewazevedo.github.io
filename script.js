let deck = [];
let userDeck = [];
let cpuDeck = [];

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let card = values[i] + "-" + suits[j];
            deck.push(card);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function assignCards() {
    for (let i = 0; i < 7; i++) {
        let userCard = deck.pop();
        let cpuCard = deck.pop();
        userDeck.push(userCard);
        cpuDeck.push(cpuCard);
        let userCardImg = document.createElement("img");
        let cpuCardImg = document.createElement("img");
        userCardImg.src = "./Cards/" + userCard + ".png";
        cpuCardImg.src = "./Cards/hidden.png";
        document.getElementById("userDeck").append(userCardImg);
        document.getElementById("cpuDeck").append(cpuCardImg);
    }
}

buildDeck();
shuffleDeck();
assignCards();
