

function getUserNums(){
    const numlist = [...document.querySelectorAll(".usernumber")];
    const userNums = [];
    for(let i = 0; i < numlist.length; i++){
        userNums.push(numlist[i].value);
    }
    return new Set(userNums);
}
function checkNums(numSet){
    if (numSet.size < 5){
        return false;
    }
    else{
        for(const number of numSet){
            if(number > 70 || number < 1){
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

function createWinningTicket(possiblenumbers) {
    const winningTicket = [];
    for (let i = 0; i < 5; i++) {
        const winningNumber = possiblenumbers.splice([Math.floor(Math.random() * possiblenumbers.length)], 1)
        winningTicket.push(winningNumber.toString());
    }
    return winningTicket;
}