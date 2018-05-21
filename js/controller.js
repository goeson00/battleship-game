function Controller(model) {
    this.guesses = 0;
}

Controller.prototype.processGuess = function(guess) {
    if (helpers.isValidGuess(guess, model.boardSize)) {
        const location = helpers.parseGuess(guess),
        hit = model.fire(location);
        
        this.guesses++;
        
        if (hit && model.shipsSunk === model.numberOfShips) {
            this.gameOver();
        }
    }
};

Controller.prototype.gameOver = function() {
    view.displayMessage(`Game Over! You sunk the ships in ${this.guesses} trials`);
};