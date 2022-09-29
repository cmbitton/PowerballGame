const errorScreen = document.querySelector('.info-screen');
const playButton = document.querySelector('.play-button');
const playMultipleButton = document.querySelector('.play-multiple-button');
const winningNumOutput = document.querySelector('.winning-numbers');
const bank = document.querySelector('.bank');
let bankAmount = 0;
bank.textContent = `Bank: $${bankAmount}`;
//nums buttons for ticket:
const clearNumsButton = document.querySelector('.clear-nums-button');
const randomNumsButton = document.querySelector('.random-nums-button');
clearNumsButton.addEventListener('click', clearNums);
randomNumsButton.addEventListener('click', generateRandomUserNums)
//bank buttons:
const bankButton = document.querySelector('.bank-button');
bankButton.addEventListener('click', addMoneyToBank);

//scoreboard object:
const scoreboard = {
    winPowerball: 0,
    match5: 0,
    match4Powerball: 0,
    match4: 0,
    match3Powerball: 0,
    match3: 0,
    match2Powerball: 0,
    match1Powerball: 0,
    matchPowerball: 0,
    totalDollarsWon: 0,
    totalLostGames: 0,
    gamesWon: 0,
    totalGames: 0,
    calculatePayout: function (matchingNumbers, userPowerball, winningPowerball) {
        if (matchingNumbers.length === 0 && userPowerball === winningPowerball) {
            this.matchPowerball += 1;
            this.totalDollarsWon += 4;
            this.gamesWon += 1;
            this.totalGames += 1;
        }
        else if (matchingNumbers.length === 1 && userPowerball === winningPowerball) {
            this.match1Powerball += 1;
            this.totalDollarsWon += 4;
            this.gamesWon += 1;
            this.totalGames += 1;
        }
        else if (matchingNumbers.length === 2 && userPowerball === winningPowerball) {
            this.match2Powerball += 1;
            this.totalDollarsWon += 7;
            this.gamesWon += 1;
            this.totalGames += 1;
        }
        else if (matchingNumbers.length === 3 && userPowerball !== winningPowerball) {
            this.match3 += 1;
            this.totalDollarsWon += 7;
            this.gamesWon += 1;
            this.totalGames += 1;
        }
        else if (matchingNumbers.length === 3 && userPowerball === winningPowerball) {
            this.match3Powerball += 1;
            this.totalDollarsWon += 100;
            this.gamesWon += 1;
            this.totalGames += 1;
        }
        else if (matchingNumbers.length === 4 && userPowerball !== winningPowerball) {
            this.match4 += 1;
            this.totalDollarsWon += 100;
            this.gamesWon += 1;
            this.totalGames += 1;
        }
        else if (matchingNumbers.length === 4 && userPowerball === winningPowerball) {
            this.match4Powerball += 1;
            this.totalDollarsWon += 50000;
            this.gamesWon += 1;
            this.totalGames += 1;
        }
        else if (matchingNumbers.length === 5 && userPowerball !== winningPowerball) {
            this.match5 += 1;
            this.totalDollarsWon += 1000000;
            this.gamesWon += 1;
            this.totalGames += 1;
        }
        else if (matchingNumbers.length === 5 && userPowerball === winningPowerball) {
            this.winPowerball += 1;
            this.totalDollarsWon += 100000000;
            this.gamesWon += 1;
            this.totalGames += 1;
        }
        else {
            this.totalLostGames += 1;
            this.totalGames += 1;
        }

    },
    displayInfo: function () {
        const wonPoweball = document.querySelector('.won-powerball');
        const match5 = document.querySelector('.match-5');
        const match4Powerball = document.querySelector('.match-4-powerball');
        const match4 = document.querySelector('.match-4');
        const match3Powerball = document.querySelector('.match-3-powerball');
        const match3 = document.querySelector('.match-3');
        const match2Powerball = document.querySelector('.match-2-powerball');
        const match1Powerball = document.querySelector('.match-1-powerball');
        const matchPowerball = document.querySelector('.match-powerball');

        wonPoweball.textContent = `${this.winPowerball.toLocaleString('en-US')}`;
        match5.textContent = `${this.match5.toLocaleString('en-US')}`;
        match4Powerball.textContent = `${this.match4Powerball.toLocaleString('en-US')}`;
        match4.textContent = `${this.match4.toLocaleString('en-US')}`;
        match3Powerball.textContent = `${this.match3Powerball.toLocaleString('en-US')}`;
        match3.textContent = `${this.match3.toLocaleString('en-US')}`;
        match2Powerball.textContent = `${this.match2Powerball.toLocaleString('en-US')}`;
        match1Powerball.textContent = `${this.match1Powerball.toLocaleString('en-US')}`;
        matchPowerball.textContent = `${this.matchPowerball.toLocaleString('en-US')}`;

        const dollarsWon = document.querySelector('.dollars-won');
        const dollarsLost = document.querySelector('.dollars-lost');
        const overallWinLoss = document.querySelector('.overall-win-loss')
        const totalGames = document.querySelector('.total-games');
        const totalGamesWon = document.querySelector('.total-games-won');
        const totalGamesLost = document.querySelector('.total-games-lost');
        dollarsWon.textContent = `$${this.totalDollarsWon.toLocaleString('en-US')}`
        dollarsLost.textContent = `$${(this.totalLostGames * 2).toLocaleString('en-US')}`
        overallWinLoss.textContent = `$${(this.totalDollarsWon - this.totalLostGames * 2).toLocaleString('en-US')}`
        totalGames.textContent = `${this.totalGames.toLocaleString('en-US')}`
        totalGamesWon.textContent = `${this.gamesWon.toLocaleString('en-US')}`
        totalGamesLost.textContent = `${this.totalLostGames.toLocaleString('en-US')}`

    }
}
function addMoneyToBank() {
    const addedMoney = document.querySelector('.add-money');
    if (addedMoney.value !== '' && addedMoney.value > 0 && addedMoney.value <= 1000000) {
        bankAmount += parseInt(addedMoney.value);
        bank.textContent = `Bank: $${bankAmount.toLocaleString('en-US')}`;
    }
    else {
        errorScreen.textContent = 'You must input a valid number between 1 and 1 million when adding money to the Bank';
    }
}

function getUserPowerball() {
    const userPowerball = document.querySelector('.user-number-powerball').value;
    if (userPowerball < 1 || userPowerball > 26 || userPowerball === '') {
        return false;
    }
    else {
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
function clearNums(){
    const numlist = [...document.querySelectorAll(".usernumber")];
    const userPowerball = document.querySelector('.user-number-powerball');
    userPowerball.value = '';
    for (let i = 0; i < numlist.length; i++) {
        numlist[i].value = '';
    }
}
function generateRandomUserNums(){
    const numlist = [...document.querySelectorAll(".usernumber")];
    const userPowerball = document.querySelector('.user-number-powerball');
    const ticket = createWinningTicket(createLotteryNumberOptions());
    userPowerball.value = createPowerball();
    for (let i = 0; i < numlist.length; i++) {
        numlist[i].value = ticket[i];
    }
}

function checkNums(numSet) {
    if (numSet.size < 5) {
        return false;
    }
    else {
        for (const number of numSet) {
            if (number > 69 || number < 1) {
                return false;
            }
        }
        return true;
    }
}

function createLotteryNumberOptions() {
    const numberOptions = [];
    for (let i = 1; i <= 69; i++) {
        numberOptions.push(i);
    }
    return numberOptions;
}

function createPowerball() {
    return (Math.floor(Math.random() * 26) + 1);
}

function checkPowerballs(userPowerball, winningPowerball) {
    if (userPowerball === winningPowerball) {
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

function playRound(usernumbers, userPowerball, SingleGame = false) {
    const lottoNumberList = createLotteryNumberOptions();
    const winningNumbers = createWinningTicket(lottoNumberList);
    const matchingNumbers = checkMatches(usernumbers, winningNumbers);
    const winningPowerball = createPowerball();
    const matchingPowerballs = checkPowerballs(userPowerball, winningPowerball)
    if (SingleGame === true) {
        errorScreen.textContent = `Matching Numbers: ${matchingNumbers.join(' ')} 
                                   Matched Powerball: ${matchingPowerballs}`;
        winningNumOutput.innerHTML = `Winning Numbers: ${winningNumbers.join(' ')} Powerball: ${winningPowerball}`;
    }
    bankAmount -= 2;
    bank.textContent = `Bank: $${bankAmount}`;
    scoreboard.calculatePayout(matchingNumbers, userPowerball, winningPowerball);
}


function playSingleGame() {
    const userNums = getUserNums();
    const userPowerball = getUserPowerball();
    if (checkNums(userNums) === false || userPowerball === false) {
        errorScreen.textContent = 'You must input 5 different numbers between 1 and 69 and a Powerball between 1 and 26'
        winningNumOutput.textContent = '';
    }
    else {
        if (bankAmount < 2) {
            errorScreen.textContent = 'Not enough money in Bank';
            winningNumOutput.textContent = '';
        }
        else {
            playRound(userNums, userPowerball, true);
            scoreboard.displayInfo();
        }
    }
}

function playMultipleGames() {
    const userNums = getUserNums();
    const userPowerball = getUserPowerball();
    if (checkNums(userNums) === false || userPowerball === false) {
        errorScreen.textContent = 'You must input 5 different numbers between 1 and 69 and a Powerball between 1 and 26'
        winningNumOutput.textContent = '';
    }
    else {
        if (bankAmount < 2) {
            errorScreen.textContent = 'Not enough money in Bank';
            winningNumOutput.textContent = '';
        }
        else {
            for (bankAmount; bankAmount >= 2; bankAmount - 2) {
                playRound(userNums, userPowerball);
            }
            scoreboard.displayInfo();
            errorScreen.textContent = `You played using all the money in your bank. See stats below for game details`;
            winningNumOutput.textContent = '';
        }
    }
}


playButton.addEventListener('click', playSingleGame)
playMultipleButton.addEventListener('click', playMultipleGames)
