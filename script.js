let deck = [];
let userDeck = [];
let cpuDeck = [];
let userBooks = 0;
let cpuBooks = 0;
let gameStart = true;
let isUserTurn = true;
let gameOver = false;
let turn = "user";
let btn = document.getElementById("play-again");

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
        setTimeout(checkUserBooks, 3000);
    } else {
        let newCard = deck.pop();
        userDeck.push(newCard);
        let userCardImg = document.createElement("img");
        userCardImg.setAttribute("id", newCard);
        userCardImg.addEventListener("click", function(){main(newCard);});
        userCardImg.src = "./Cards/" + newCard + ".png";
        document.getElementById("userDeck").append(userCardImg);
        let pickedCard = newCard.split("-");
        let pickedValue = pickedCard[0];
        if (pickedValue === userValue) {
            document.getElementById("feedback-text").innerHTML = "Go Fish. You Guessed " + userValue + " But Found a Match in the Pile!";
            setTimeout(checkUserBooks, 3000);
        } else {
            document.getElementById("feedback-text").innerHTML = "Go Fish. You Guessed " + userValue;
            turn = "cpu";
            setTimeout(checkUserBooks, 3000);
        }
    }
    console.log("User: " + userDeck);
    console.log("Cpu: " + cpuDeck);
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
        document.getElementById("feedback-text").innerHTML = "Oh No! The CPU Found a Match of " + cpuValue + "'s";
        setTimeout(checkCpuBooks, 3000);
    } else {
        let newCard = deck.pop();
        cpuDeck.push(newCard);
        let cpuCardImg = document.createElement("img");
        cpuCardImg.setAttribute("id", newCard);
        cpuCardImg.src = "./Cards/hidden.png";
        document.getElementById("cpuDeck").append(cpuCardImg);
        let pickedCard = newCard.split("-");
        let pickedValue = pickedCard[0];
        if (pickedValue === cpuValue) {
            document.getElementById("feedback-text").innerHTML = "CPU Went Fishing After Guessing " + cpuValue + " But Found A Match in the Pile.";
            setTimeout(checkCpuBooks, 3000);
        } else {
            document.getElementById("feedback-text").innerHTML = "CPU Went Fishing After Guessing " + cpuValue;
            turn = "user";
            setTimeout(checkCpuBooks, 3000);
        }
    }
    console.log("User: " + userDeck);
    console.log("Cpu: " + cpuDeck);
}

function checkUserBooks() {
    let bookFound = false;
    for (let i = 0; i < userDeck.length; i++) {
        let userCard1 = userDeck[i];
        let fullUserValue1 = userCard1.split("-");
        let userValue1 = fullUserValue1[0];
        let indexArray = [i];
        for (let j = 0; j < userDeck.length; j++) {
            let userCard2 = userDeck[j];
            let fullUserValue2 = userCard2.split("-");
            let userValue2 = fullUserValue2[0];
            if (i !== j && userValue1 === userValue2) {
                indexArray.push(j);
            }
        }
        if (indexArray.length === 4) {
            bookFound = true;
            userBooks++;
            document.getElementById("user-score").innerHTML = userBooks;
            document.getElementById("feedback-text").innerHTML = "You Made a Book of " + userValue1 + "'s!";
            for (let j = indexArray.length - 1; j >= 0; j--) {
                let userCardImg = document.getElementById(userDeck[indexArray[j]]);
                userCardImg.remove();
                userDeck.splice(indexArray[j], 1);
            }
        }
    }
    
    checkGameEnd();
    if (bookFound) {
        if (turn === "user") {
            if (gameOver) {
                checkWinner();
            } else {
                if (userDeck.length <= 0) {
                    let newCard = deck.pop();
                    userDeck.push(newCard);
                    let userCardImg = document.createElement("img");
                    userCardImg.setAttribute("id", newCard);
                    userCardImg.addEventListener("click", function(){main(newCard);});
                    userCardImg.src = "./Cards/" + newCard + ".png";
                    document.getElementById("userDeck").append(userCardImg);
                    document.getElementById("feedback-text").innerHTML = "You Went Fishing Because You Had No Cards.";
                } else {
                    setTimeout(function() {document.getElementById("feedback-text").innerHTML = "Your Turn!"; isUserTurn = true;}, 3000);
                    btn.disabled = false;
                }
            }
        } else if (turn === "cpu") {
            if (gameOver) {
                checkWinner();
            } else {
                setTimeout(cpuTurn, 3000);
            }
        }
    } else {
        if (turn === "user") {
            if (gameOver) {
                checkWinner();
            } else {
                document.getElementById("feedback-text").innerHTML = "Your Turn!";
                btn.disabled = false;
                isUserTurn = true;
            }
        } else if (turn = "cpu") {
            if (gameOver) {
                checkWinner();
            } else {
                cpuTurn();
            }
        }
    }
}

function checkCpuBooks() {
    let bookFound = false;
    for (let i = 0; i < cpuDeck.length; i++) {
        let cpuCard1 = cpuDeck[i];
        let fullCpuValue1 = cpuCard1.split("-");
        let cpuValue1 = fullCpuValue1[0];
        let indexArray = [i];
        for (let j = 0; j < cpuDeck.length; j++) {
            let cpuCard2 = cpuDeck[j];
            let fullCpuValue2 = cpuCard2.split("-");
            let cpuValue2 = fullCpuValue2[0];
            if (i !== j && cpuValue1 === cpuValue2) {
                indexArray.push(j);
            }
        }
        if (indexArray.length === 4) {
            bookFound = true;
            cpuBooks++;
            document.getElementById("cpu-score").innerHTML = cpuBooks;
            document.getElementById("feedback-text").innerHTML = "Oh No! The CPU Made a Book of " + cpuValue1 + "'s";
            for (let j = indexArray.length - 1; j >= 0; j--) {
                let cpuCardImg = document.getElementById(cpuDeck[indexArray[j]]);
                cpuCardImg.remove();
                cpuDeck.splice(indexArray[j], 1);
            }
        }
    }

    checkGameEnd();
    if (bookFound) {
        if (turn === "user") {
            if (gameOver) {
                checkWinner();
            } else {
                setTimeout(function() {document.getElementById("feedback-text").innerHTML = "Your Turn!"; isUserTurn = true;}, 3000);
                btn.disabled = false;
            }
        } else if (turn === "cpu") {
            if (gameOver) {
                checkWinner();
            } else {
                setTimeout(cpuTurn, 3000);
            }
        }
    } else {
        if (turn === "user") {
            if (gameOver) {
                checkWinner();
            } else {
                document.getElementById("feedback-text").innerHTML = "Your Turn!";
                btn.disabled = false
                isUserTurn = true;
            }
        } else if (turn = "cpu") {
            if (gameOver) {
                checkWinner();
            } else {
                cpuTurn();
            }
        }
    }
}

function checkGameEnd() {
    if (userDeck.length <= 0 && turn == "user") {
        gameOver = true;
    } else if (cpuDeck.length <= 0 && turn == "cpu") {
        gameOver = true;
    } else if (userDeck.length <= 0 && deck.length <= 0) {
        gameOver = true;
    } else if (cpuDeck.length <= 0 && deck.length <= 0) {
        gameOver = true;
    }
}

function checkWinner() {
    if (userBooks > cpuBooks) {
        document.getElementById("feedback-text").innerHTML = "Game Over. You Won the Game!";
    } else if (userBooks < cpuBooks) {
        document.getElementById("feedback-text").innerHTML = "Game Over. CPU Won the Game.";
    } else {
        document.getElementById("feedback-text").innerHTML = "Game Over. You and the CPU Tied the Game.";
    }
    btn.disabled = false;
}

function playAgain() {
    for (let i = userDeck.length - 1; i >= 0; i--) {
        let userCardImg = document.getElementById(userDeck[i]);
        userCardImg.remove();
    }

    for (let i = cpuDeck.length - 1; i >= 0; i--) {
        let cpuCardImg = document.getElementById(cpuDeck[i]);
        cpuCardImg.remove();
    }

    deck = [];
    userDeck = [];
    cpuDeck = [];
    userBooks = 0;
    cpuBooks = 0;
    document.getElementById("user-score").innerHTML = userBooks;
    document.getElementById("cpu-score").innerHTML = cpuBooks;
    gameStart = true;
    isUserTurn = true;
    gameOver = false;
    turn = "user";
    
    main();
}

function main(card) {
    if (gameStart) {
        buildDeck();
        shuffleDeck();
        assignCards();
        document.getElementById("feedback-text").innerHTML = "Play Go Fish";
        console.log("User: " + userDeck);
        console.log("Cpu: " + cpuDeck);
        gameStart = false;
    } else if (isUserTurn && !gameOver) {
        btn.disabled = true;
        userTurn(card);
        isUserTurn = false;
    }
}

main();