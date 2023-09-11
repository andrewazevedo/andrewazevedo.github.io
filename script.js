let deck = [];
let userDeck = [];
let cpuDeck = [];
let gameStart = true;
let isUserTurn = true;

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
        userCardImg.setAttribute("id", userCard);
        cpuCardImg.setAttribute("id", cpuCard);
        userCardImg.addEventListener("click", function(){main(userCard);});
        userCardImg.src = "./Cards/" + userCard + ".png";
        cpuCardImg.src = "./Cards/hidden.png";
        document.getElementById("userDeck").append(userCardImg);
        document.getElementById("cpuDeck").append(cpuCardImg);
    }
}

function userTurn(card) {
    let found = false; 
    let fullUserCard = card.split("-");
    let userValue = fullUserCard[0];
    console.log("User guess: " + userValue);
    for (let i = 0; i < cpuDeck.length; i++) {
        let fullCpuCard = cpuDeck[i].split("-");
        let cpuValue = fullCpuCard[0];
        if (userValue === cpuValue) {
            let foundCard = cpuDeck[i];
            userDeck.push(foundCard);
            cpuDeck.splice(cpuDeck.indexOf(foundCard), 1);
            let cpuCardImg = document.getElementById(foundCard);
            cpuCardImg.remove();
            let userCardImg = document.createElement("img");
            userCardImg.setAttribute("id", foundCard);
            userCardImg.addEventListener("click", function(){main(foundCard);});
            userCardImg.src = "./Cards/" + foundCard + ".png";
            document.getElementById("userDeck").append(userCardImg);
            found = true;
        }
    }

    if (found) {
        document.getElementById("feedback-text").innerHTML = "You Found a Match of " + userValue + "'s";
    } else {
        document.getElementById("feedback-text").innerHTML = "Go Fish. You guessed " + userValue;
        let newCard = deck.pop();
        userDeck.push(newCard);
        let userCardImg = document.createElement("img");
        userCardImg.setAttribute("id", newCard);
        userCardImg.addEventListener("click", function(){main(newCard);});
        userCardImg.src = "./Cards/" + newCard + ".png";
        document.getElementById("userDeck").append(userCardImg);
    }
    console.log("User: " + userDeck);
    console.log("Cpu: " + cpuDeck);
    setTimeout(cpuTurn, 1500);
}

function cpuTurn() {
    let found = false;
    let index = Math.floor(Math.random() * cpuDeck.length);
    let cpuGuess = cpuDeck[index];
    let fullCpuValue = cpuGuess.split("-");
    let cpuValue = fullCpuValue[0];
    console.log("Cpu guess: " + cpuValue);
    for (let i = 0; i < userDeck.length; i++) {
        let fullUserValue = userDeck[i].split("-");
        let userValue = fullUserValue[0];
        if (cpuValue === userValue) {
            let foundCard = userDeck[i];
            cpuDeck.push(foundCard);
            userDeck.splice(userDeck.indexOf(foundCard), 1);
            let userCardImg = document.getElementById(foundCard);
            userCardImg.remove();
            let cpuCardImg = document.createElement("img");
            cpuCardImg.setAttribute("id", foundCard);
            cpuCardImg.src = "./Cards/hidden.png";
            document.getElementById("cpuDeck").append(cpuCardImg);
            found = true;
        }
    }

    if (found) {
        document.getElementById("feedback-text").innerHTML = "Oh No! The CPU Found a Match of " + cpuValue + "'s"
    } else {
        document.getElementById("feedback-text").innerHTML = "CPU Went Fishihng After Guessing " + cpuValue;
        let newCard = deck.pop();
        cpuDeck.push(newCard);
        let cpuCardImg = document.createElement("img");
        cpuCardImg.setAttribute("id", newCard);
        cpuCardImg.src = "./Cards/hidden.png";
        document.getElementById("cpuDeck").append(cpuCardImg);
    }
    console.log("User: " + userDeck);
    console.log("Cpu: " + cpuDeck);
    isUserTurn = true;
}

function main(card) {
    if (gameStart) {
        buildDeck();
        shuffleDeck();
        assignCards();
        console.log("User: " + userDeck);
        console.log("Cpu: " + cpuDeck);
        gameStart = false;
    } else if (isUserTurn) {
        userTurn(card);
        isUserTurn = false;
    }
}

main();