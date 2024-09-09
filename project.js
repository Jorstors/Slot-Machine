const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  Z: 3,
  A: 4,
  B: 6,
  C: 8,
  D: 10,
};

const SYMBOLS_VALUE = {
  Z: 50,
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = [parseFloat(depositAmount)];

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Please enter a valid number greater than 0");
      continue;
    }

    console.log("Your deposit amount is: " + numberDepositAmount);
    return numberDepositAmount;
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3) {
      console.log("Please enter a valid number of lines (1-3)");
      continue;
    }

    return numberOfLines;
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter your bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again.");
      continue;
    }

    return numberBet;
  }
};

const spin = () => {
  const symbols = [];
  const reels = [];

  // loading symbol array
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  for (let i = 0; i < COLS; i++) {
    // each reel(column) has a different symbol array
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      // add a pipe after each symbol
      if (i != rows.length - 1) {
        rowString += " | ";
      }
    }

    console.log(rowString);
  }
};

const checkWin = (rows) => {
  let linesWon = 0;
  // map of what lines won and their values
  let whatLinesWon = new Map();
  for (const row of rows) {
    if (row[0] === row[1] && row[1] === row[2]) {
      // pushing the line and its value to the map
      whatLinesWon.set(linesWon, SYMBOLS_VALUE[row[0]]);
      linesWon += 1;
    }
  }

  if (linesWon === 0) {
    return false;
  } else {
    return whatLinesWon;
  }
};

const printOutcome = (whatLinesWon, balance, bet, lines) => {
  if (whatLinesWon === false) {
    console.log("You lost $" + bet * lines);
    balance[0] -= bet * lines;
  } else {
    let totalWinnings = bet;
    let jackpot = false;
    for (const [key, value] of whatLinesWon) {
      totalWinnings += Math.round(value * bet * 2);
      if (value === 50) {
        console.log("Jackpot!");
      }
    }
    balance[0] += totalWinnings;

    console.log(
      "You won $" +
        totalWinnings +
        " from " +
        whatLinesWon.size +
        (whatLinesWon.size > 1 ? " lines" : " line")
    );
  }
};

let balance = deposit();

let quit = false;
while (!quit) {
  let lines = getNumberOfLines();
  let bet = getBet(balance, lines);
  let reels = spin();
  let rows = transpose(reels);
  printRows(rows);

  let outcomeMap = checkWin(rows);
  printOutcome(outcomeMap, balance, bet, lines);

  console.log("Current balance: $" + balance);

  if (balance <= 0) {
    console.log("You ran out of money!");
    break;
  }

  quitStr = prompt("Do you want to play again? (y/n): ");
  quit = quitStr.toLowerCase() === "n" ? true : false;
}
