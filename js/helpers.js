const helpers = {

    rows: ["A", "B", "C", "D", "E", "F", "G"],
    
    parseGuess(guess) {
        const rowNumber = this.rows.indexOf(guess[0]);
        return rowNumber + guess[1];
    },

    isValidGuess(guess, boardSize) {
        const emptyMsg = "Field is empty!",
        rowInvalidMsg = `First character should be letter from ${this.rows[0]} to ${this.rows[this.rows.length - 1]}.`,
        colInvalidMsg = `Second character should be number from 0 to ${boardSize - 1}.`;

        if (guess) {
            const rowChar = this.rows.indexOf(guess[0]),
            colChar = guess[1];

            if (rowChar == -1) {
                view.displayMessage(rowInvalidMsg);
                return false;
            } else if (isNaN(colChar) || colChar < 0 || colChar >= boardSize) {
                view.displayMessage(colInvalidMsg);
                return false;
            } else {
                return true;
            }
        } else {
            view.displayMessage(emptyMsg);
            return false;
        }
    },

    trimGuessInput(guess) {
        if (guess.length > 2) return guess.substr(0, 2);
        return guess;
    },

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }
    
};