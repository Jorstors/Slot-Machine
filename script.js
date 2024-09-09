document.addEventListener("DOMContentLoaded", () => {
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

  const SYMBOLS_IMG = {
    Z: "./assets/symbols/jackpot.png",
    A: "./assets/symbols/cherry.png",
    B: "./assets/symbols/clover.png",
    C: "./assets/symbols/diamond.png",
    D: "./assets/symbols/seven.png",
  };

  const deposit = () => {
    while (true) {
      const depositAmount = prompt("Enter a deposit amount: ");
      const numberDepositAmount = parseInt(depositAmount);

      console.log(numberDepositAmount);

      if (
        isNaN(numberDepositAmount) ||
        numberDepositAmount <= 0 ||
        numberDepositAmount > 1000000
      ) {
        alert("Please enter a valid number from 0 - 1,000,000");
        continue;
      }

      // adjust balance on browser
      document.querySelector("#balance").textContent = numberDepositAmount;
      return numberDepositAmount;
    }
  };

  const getNumberOfLines = () => {
    const lines = document.querySelector("#lines").value;
    const numberOfLines = parseInt(lines);

    if (isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3) {
      // flash error
      document.querySelector("#errorlog").textContent = "";
      setTimeout(() => {
        document.querySelector("#errorlog").textContent =
          "Invalid bet, try again";
      }, 100);

      return false;
    }

    return numberOfLines;
  };

  const getBet = (balance, lines) => {
    const bet = document.querySelector("#bet").value;
    const numberBet = parseInt(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      // flash error
      document.querySelector("#errorlog").textContent = "";
      setTimeout(() => {
        document.querySelector("#errorlog").textContent =
          "Invalid bet, try again";
      }, 1000);

      return false;
    }

    return numberBet;
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

  const printRowsToConsole = (rows) => {
    // console.log the spin
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

  const printRowsToBrowser = (reels) => {
    // adjusting browser
    reels.forEach((col, colIndex) => {
      col.forEach((row, rowIndex) => {
        // Build the selector
        const selector =
          ".slot" + (colIndex + 1) + " .row" + (rowIndex + 1) + " img";
        // Select the element
        const element = document.querySelector(selector);
        // Ensure the element exists before trying to update it
        if (element) {
          element.src = SYMBOLS_IMG[row];
        } else {
          console.error("Element not found for selector:", selector);
        }
      });
    });
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

  // displays the outcome to the user on the browser
  const printOutcome = (whatLinesWon, balance, bet, lines) => {
    if (whatLinesWon === false) {
      document.querySelector("#errorlog").textContent =
        "You lost $" + bet * lines;
      balance[0] -= bet * lines;
    } else {
      let totalWinnings = bet;
      let jackpot = false;
      for (const [key, value] of whatLinesWon) {
        totalWinnings += Math.round(value * bet * 2);
        if (value === 50) {
          document.querySelector("#errorlog").textContent = "Jackpot!";
        }
        document.querySelector("#errorlog").textContent =
          "You won $" + totalWinnings;
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

  // balance is a one element array for passing by reference
  let balance = deposit();
  let quit = false;

  document.querySelector("#spinButton").addEventListener("click", () => {
    // checking balance before spinning
    balance = [parseInt(document.querySelector("#balance").textContent)];
    console.log("Script started");
    console.log("Balance: $" + balance[0]);
    // checking line and bet input before spinning
    let lines = getNumberOfLines();
    if (lines === false) {
      console.log("Lines input error");
      return;
    }
    let bet = getBet(balance, lines);
    if (bet === false) {
      console.log("Bet input error");
      return;
    }
    // spinning
    let reels = spin();
    let rows = transpose(reels);
    printRowsToConsole(rows); // console.log the spin
    printRowsToBrowser(reels); // adjust browser

    // make a map of what lines won, their values, then adjust browswer accordingly
    let outcomeMap = checkWin(rows);
    printOutcome(outcomeMap, balance, bet, lines);
    // adjust balance on browser
    document.querySelector("#balance").textContent = balance[0];

    if (balance[0] <= 0) {
      // alert user that they ran out of money
      document.querySelector("#errorlog").textContent =
        "You ran out of money! Refresh the page to play again.";
      // break out of loop
      quit = true;
    }
  });
});
