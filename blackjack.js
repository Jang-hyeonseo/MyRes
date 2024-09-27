// blackjack.js

let playerCards = [7, 5];
let playerSum = playerCards.reduce((sum, card) => sum + card, 0);

let dealerCards = [7, 5];
let dealerSum = dealerCards.reduce((sum, card) => sum + card, 0);

function printResult(message) {
    console.log(message);
    console.log(`플레이어의 카드: ${playerCards.join(', ')} (합계: ${playerSum})`);
    console.log(`딜러의 카드: ${dealerCards.join(', ')} (합계: ${dealerSum})`);
}

function playerTurn() {
    if (playerSum === 21 && playerCards.length === 2) {
        printResult("블랙잭! 당신이 이겼습니다!");
        return;
    }

    playerCards.push(7);
    playerSum += 7;

    if (playerSum > 21) {
        printResult("버스트! 당신이 졌습니다.");
        return;
    }
}

function dealerTurn() {
    while (dealerSum < 17) {
        let newCard = 6;
        dealerCards.push(newCard);
        dealerSum += newCard;
    }

    if (dealerSum > 21) {
        printResult("딜러 버스트! 당신이 이겼습니다!");
        return;
    }
}

playerTurn();

if (playerSum <= 21) {
    dealerTurn();

    if (playerSum > dealerSum) {
        printResult("당신이 이겼습니다!");
    } else if (playerSum < dealerSum) {
        printResult("딜러가 이겼습니다.");
    } else {
        printResult("무승부입니다!");
    }
}