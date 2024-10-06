# Slot Machine Project

This is a simple slot machine project split into two sections: a browser-based slot machine and a Node.js-based slot machine. The browser version uses HTML, CSS, and JavaScript to display a visual slot machine, while the Node.js version runs in the console, offering a more basic, text-based experience.

## Project Structure

- **/assets/**: Contains the image files for the slot machine symbols.
- **/node_modules/**: Contains all Node.js dependencies required for the console project to run, such as third-party libraries and modules.
- **index.html**: The main HTML file for the browser version of the slot machine.
- **style.css**: The CSS file for styling the browser slot machine.
- **script.js**: The JavaScript file controlling the logic for the browser slot machine.
- **project.js**: The Node.js version of the slot machine that runs in the console.
- **package.json**: Defines Node.js dependencies and project metadata.
- **package-lock.json**: Contains the detailed dependency tree for Node.js.
- **README.md**: Project documentation.


### Features

#### 1. Browser Slot Machine
- **Technologies**: HTML, CSS, JavaScript.
- **How it works**: 
  - Players can input their bet and the number of lines to play.
  - The slot machine spins and displays the result using images.
  - Players' balance is adjusted based on the outcome (wins or losses).
  
#### 2. Node.js Slot Machine
- **Technologies**: Node.js, Prompt-Sync.
- **How it works**:
  - Run in the console.
  - Players can input their deposit, number of lines, and bet.
  - The slot machine spins, and the results are printed to the console.
  - Players' balance is adjusted based on the outcome.
  
### Setup

#### Browser Version
1. Clone the repository:
    ```bash
    git clone https://github.com/Jorstors/slot-machine.git
    ```
2. Open `index.html` in your browser to play the browser-based slot machine.

#### Node.js Version
1. Clone the repository:
    ```bash
    git clone https://github.com/Jorstors/slot-machine.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the Node.js slot machine:
    ```bash
    node project.js
    ```

### Dependencies

- **Browser Version**: No external dependencies required, just open in a browser.
- **Node.js Version**:
  - [Prompt-sync](https://www.npmjs.com/package/prompt-sync) for synchronous input handling.

### License

This project is licensed under the ISC License:

Copyright (c) 2024, Justus Jones

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

---

Made by [Justus Jones](https://github.com/Jorstors)
