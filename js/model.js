function Model(boardSize, numberOfShips, shipLength) {
    this.boardSize = boardSize;
    this.numberOfShips = numberOfShips;
    this.ships = [];
    this.shipsSunk = 0;
    this.shipLength = shipLength;
}

Model.prototype.fire = function(guess) {
    for (const ship of this.ships) {
        const guessIdx = ship.locations.indexOf(guess),
        guessed = guessIdx != -1,
        hit = ship.hits[guessIdx] === "hit";
        
        if (guessed && !hit) {
            ship.hits[guessIdx] = "hit";
            view.displayHit(guess);
            view.displayMessage("Bull's eye!");
            
            if (ship.isSunk()) {
                this.shipsSunk++;
                view.displayMessage("Run for your life!");
            }
            
            return true;
        } else if (hit) {
            view.displayMessage("It has already been hit!");

            return false;
        }
    }
    
    view.displayMiss(guess);
    view.displayMessage("You didn't even scratch the surface!");
    
    return false;
};

Model.prototype.generateShip = function() {
    const direction = helpers.getRandomNumber(0, 1) ? "horizontal" : "vertical",
    row = {
        horizontal: helpers.getRandomNumber(0, this.boardSize - 1),
        vertical: helpers.getRandomNumber(0, (this.boardSize - this.shipLength))
    },
    col = {
        horizontal: helpers.getRandomNumber(0, (this.boardSize - this.shipLength)),
        vertical: helpers.getRandomNumber(0, this.boardSize - 1)
    },
    newShipLocations = [];
    
    addShipLocation(this.shipLength, row[direction], col[direction]);
    
    return newShipLocations;
    
    function addShipLocation(shipLength, row, col) {
        if (shipLength === 0) return;
        
        const location = `${row}${col}`;
        
        if (direction === "horizontal") {
            newShipLocations.push(location);
            addShipLocation(--shipLength, row, col + 1);
        } else if (direction === "vertical") {
            newShipLocations.push(location);
            addShipLocation(--shipLength, row + 1, col);
        }
    }
};

Model.prototype.collision = function(newShipLocations) {
    for (const ship of this.ships) {
        for (const location of ship.locations) {
            if (newShipLocations.includes(location)) return true;
        }
    }
    
    return false;
}

Model.prototype.createShips = function() {
    for (let i = 0; i < this.numberOfShips; i++) {
        addShip.call(this);
    }
    
    function addShip() {
        const newShipLocations = this.generateShip();
        
        if (!this.collision(newShipLocations)) {
            this.ships.push(new Ship(newShipLocations));
        } else {
            addShip.call(this);
        }
    }
};

Model.prototype.reset = function() {
    this.ships = [];
    this.shipsSunk = 0;
}

function Ship(locations) {
    this.locations = locations;
    this.hits = ["", "", ""];
}

Ship.prototype.isSunk = function() {
    return this.hits.every(hit => hit === "hit");
};