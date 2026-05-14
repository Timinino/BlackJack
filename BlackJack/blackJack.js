let deck = {
    hearts : [1,2,3,4,5,6,7,8,9,10,10,10,10],
    diamonds : [1,2,3,4,5,6,7,8,9,10,10,10,10],
    spades : [1,2,3,4,5,6,7,8,9,10,10,10,10],
    clubs : [1,2,3,4,5,6,7,8,9,10,10,10,10]
}

let dealerPull = document.querySelector("#dealerPull");
let playerPull = document.querySelector("#playerPull");
let hiddenDealerCard;
let playerTotalText = document.querySelector("#playerTotalText");
let playerTotal = 0;
let dealerTotalText = document.querySelector("#dealerTotalText");
let dealerTotal = 0;
let firstDealerCard = 0;
let statusText = document.querySelector("#status");

let hitBtn = document.querySelector("#hitButton");
let standBtn = document.querySelector("#standButton");
let dbBtn = document.querySelector("#dbButton");
let replayBtn = document.querySelector("#replay");

function cardPull(){
    let symbols = ["hearts","diamonds","spades","clubs"];
    let randomSymbolNumber = Math.floor(Math.random()*4);
    let randomSymbol = symbols[randomSymbolNumber];

    let randomCard = Math.floor(Math.random()*deck[randomSymbol].length);
    let pulledCard = deck[randomSymbol][randomCard];
    deck[randomSymbol].splice(randomCard,1);
    return pulledCard;
}

function gameStart(){
    dbDisable();
    endGame();
    dealerTotalText.textContent = dealerTotal;
    dealerPull.textContent = firstDealerCard + " + " + hiddenDealerCard;
    if(dealerTotal >= 17 && dealerTotal <= 21){
        statusText.textContent += "Dealer Stands! ";
        if(dealerTotal > playerTotal){
            statusText.textContent += "Dealer Wins!";
            clearInterval(dealerInterval);
        }else if(dealerTotal === playerTotal){
            statusText.textContent += "Push!";
            clearInterval(dealerInterval);
        }else{
            statusText.textContent += "You Win!";
            clearInterval(dealerInterval);
        }
        return;
    }

    let dealerInterval = setInterval(function(){

    let pull = cardPull();

    dealerTotal += pull;

    dealerPull.textContent += " + " + pull;

    dealerTotalText.textContent = dealerTotal;

    if(dealerTotal > 21){
        statusText.textContent += "Dealer busts! You Win!"
        clearInterval(dealerInterval);
    }

    else if(dealerTotal >= 17){
        statusText.textContent += "Dealer stands! ";

        if(dealerTotal > playerTotal){
            statusText.textContent += "Dealer wins!";
        }
        else if(dealerTotal === playerTotal){
            statusText.textContent += "Push!"
        }
        else{
            statusText.textContent += "You win!"
        }

        clearInterval(dealerInterval);
    }

}, 1000);
}

function endGame(){
    hitBtn.disabled = true;
    dbBtn.disabled = true;
    standBtn.disabled = true;
}

function dbDisable(){
    dbBtn.disabled = true;
}

dealerTotal += cardPull();
playerTotal += cardPull();
firstDealerCard = dealerTotal;

dealerPull.textContent = dealerTotal;
playerPull.textContent = playerTotal;
 
dealerTotalText.textContent = dealerTotal
hiddenDealerCard = cardPull();
dealerTotal += hiddenDealerCard;

dealerPull.textContent += " + ?";

playerTotalText.textContent = playerTotal;

if(dealerTotal === 21){
    window.alert("Dealer got BLACKJACK!");
}

hitBtn.addEventListener("click", function(){
    dbDisable();
    let pull = cardPull();
    playerTotal += pull;
    playerPull.textContent += " + " + pull;
    playerTotalText.textContent = playerTotal;
    if(playerTotal > 21){
        statusText.textContent = "Bust!";
        endGame();
        return;
    };
});

standBtn.addEventListener("click",gameStart);

dbBtn.addEventListener("click",function(){
    let pull = cardPull();
    playerTotal += pull;
    playerPull.textContent += " + " + pull;
    playerTotalText.textContent = playerTotal
    gameStart();
});

replayBtn.addEventListener("click",function(){
    location.reload();
});