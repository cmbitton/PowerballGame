const errorScreen = document.querySelector('.info-screen');
const playButton = document.querySelector('.play-button');
const playMultipleButton = document.querySelector('.play-multiple-button');
const winningNumOutput = document.querySelector('.winning-numbers');
const bank = document.querySelector('.bank');
let bankAmount = 0;
bank.textContent = `Bank: $${bankAmount}`;
//bank buttons:
const bankButton = document.querySelector('.bank-button');
bankButton.addEventListener('click', addMoneyToBank);

function addMoneyToBank() {
    const addedMoney = document.querySelector('.add-money');
    if (addedMoney.value !== '') {
        bankAmount += parseInt(addedMoney.value);
        bank.textContent = `Bank: $${bankAmount}`;
    }
}

function getUserPowerball(){
    const userPowerball = document.querySelector('.user-number-powerball').value;
    if (userPowerball < 1 || userPowerball > 26 || userPowerball === ''){
        return false;
    }
    else{
        return parseInt(userPowerball);
    }
}

function getUserNums() {
    const numlist = [...document.querySelectorAll(".usernumber")];
    const userNums = [];
    for (let i = 0; i < numlist.length; i++) {
        userNums.push(numlist[i].value);
    }
    return new Set(userNums);
}
function checkNums(numSet) {
    if (numSet.size < 5) {
        return false;
    }
    else {
        for (const number of numSet) {
            if (number > 70 || number < 1) {
                return false;
            }
        }
        return true;
    }
}

function createLotteryNumberOptions() {
    const numberOptions = [];
    for (let i = 1; i <= 70; i++) {
        numberOptions.push(i);
    }
    return numberOptions;
}

function createPowerball(){
    return (Math.floor(Math.random() * 26) + 1);
}

function checkPowerballs(userPowerball, winningPowerball){
    if (userPowerball === winningPowerball){
        return true;
    }
    else {
        return false;
    }
}
function createWinningTicket(possibleNumbers) {
    const winningTicket = [];
    for (let i = 0; i < 5; i++) {
        const winningNumber = possibleNumbers.splice([Math.floor(Math.random() * possibleNumbers.length)], 1)
        winningTicket.push(winningNumber.toString());
    }
    return winningTicket;
}

function checkMatches(userNumbers, winningNumbers) {
    const matchingNumbers = [];
    for (const num of userNumbers) {
        for (const winningnum of winningNumbers) {
            if (num === winningnum) {
                matchingNumbers.push(winningnum);
            }
        }
    }
    return matchingNumbers;
}

function playRound(usernumbers, userPowerball){
    const lottoNumberList = createLotteryNumberOptions();
    const winningNumbers = createWinningTicket(lottoNumberList);
    const matchingNumbers = checkMatches(usernumbers, winningNumbers);
    const winningPowerball = createPowerball();
    const matchingPowerballs = checkPowerballs(userPowerball, winningPowerball)
    errorScreen.textContent = `Matching Numbers: ${matchingNumbers.join(' ')} Matched Powerball: ${matchingPowerballs}`;
    winningNumOutput.textContent = `Winning Numbers: ${winningNumbers.join(' ')} Powerball: ${winningPowerball}`;
    bankAmount -= 2;
    bank.textContent = `Bank: $${bankAmount}`;
}


function playSingleGame() {
    const userNums = getUserNums();
    const userPowerball = getUserPowerball();
    if (checkNums(userNums) === false || userPowerball === false) {
        errorScreen.textContent = 'You must input 5 different numbers between 1 and 70 and a Powerball between 1 and 26'
        winningNumOutput.textContent = '';
    }
    else {
        if (bankAmount < 2) {
            errorScreen.textContent = 'Not enough money in Bank';
        }
        else {
            playRound(userNums, userPowerball);
        }
    }
}

function playMultipleGames() {
    const userNums = getUserNums();
    const userPowerball = getUserPowerball();
    if (checkNums(userNums) === false || userPowerball === false) {
        errorScreen.textContent = 'You must input 5 different numbers between 1 and 70 and 70 and a Powerball between 1 and 26'
        winningNumOutput.textContent = '';
    }
    else {
        if (bankAmount < 2) {
            errorScreen.textContent = 'Not enough money in Bank';
        }
        else {
            for (bankAmount; bankAmount >= 2; bankAmount - 2) {
                playRound(userNums, userPowerball);
            }
        }
    }
}


playButton.addEventListener('click', playSingleGame)
playMultipleButton.addEventListener('click', playMultipleGames)
