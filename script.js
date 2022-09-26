function createLotteryNumberOptions() {
    const numberOptions = [];
    for (let i = 1; i <= 70; i++) {
        numberOptions.push(i);
    }
    return numberOptions;
}

function createWinningTicket(possiblenumbers) {
    const winningTicket = [];
    for (let i = 0; i < 5; i++) {
        const winningNumber = possiblenumbers.splice([Math.floor(Math.random() * possiblenumbers.length)], 1)
        winningTicket.push(winningNumber.toString());
    }
    return winningTicket;
}