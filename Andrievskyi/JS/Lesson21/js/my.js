var view = {
    displayMessage: function(msg) {
        var messageArea = document.querySelector('#messageArea')
        messageArea.innerHTML = msg
    },

    displayHit: function(location) {
        var cell = document.getElementById(location)
        cell.setAttribute('class', 'hit')
    },

    displayMiss: function(location) {
        var cell = document.getElementById(location)
        cell.setAttribute('class', 'miss')
    }
}

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],

	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},
	// Метод создает в модели массив ships
	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	// метод создает один корабль
	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	// метод получает один корабль и проверяет, что тот не перекрывается с другими кораблями
	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	
};


// var model = {
//     boadrSize: 7,
//     numShips: 3,
//     shipLength: 3,
//     shipSunk: 0, 

//     ships: [
//         { locations: ['0', '0', '0'], hits: ['', '', '']},
//         { locations: ['0', '0', '0'], hits: ['', '', '']},
//         { locations: ['0', '0', '0'], hits: ['', '', '']}
//     ],

//     fire: function(guess) {
//         for(var i = 0; i < this.numShips; i++) {
//             var ship = this.ships[i]
//             var index = ship.locations.indexOf(guess)
//             if(index >= 0) {
//                 ship.hits[index] = 'hit'
//                 view.displayHit(guess)
//                 view.displayMessage('HIT!!!')
//                 if(this.isSunk(ship)) {
//                     view.displayMessage('BATTLESHIP is SUNK!!!')
//                     this.shipSunk++
//                 }
//                 return true
//             }
//         }
//         view.displayMiss(guess)
//         view.displayMessage('You missed!')
//         return false
//     },

//     isSunk: function(ship) {
//         for(var i = 0; i < this.shipLength; i++) {
//             if(ship.hits[i] !== 'hit') {
//                 return false
//             }
//         }
//         return true
//     },

//     generateShipsLocations: function() {
//         var locations;

//         for(var i = 0; i < this.numShips; i++) {
//             do {
//                 locations = this.generateShip()
//             } while(this.collision(locations))
//             this.ships[i].locations = locations
//         }
//         console.log('ship array')
//         console.log(this.ships)
//     },

//     generateShip: function() {
//         var direction = Math.floor(Math.random() * 2)
//         var row, col

//         if(direction === 1) {
//             row = Math.floor(Math.random() * this.boadrSize)
//             col = Math.floor(Math.random() * (this.boadrSize - this.shipLength +1 ))
//         } else {
//             row = Math.floor(Math.random() * (this.boadrSize - this.shipLength + 1 ))
//             col = Math.floor(Math.random() * this.boadrSize)
//         }

//         var newShipLocations = []

//         for(var i = 0; i < this.shipLength; i++) {
//             if(direction === 1) {
//                 newShipLocations.push(row + '' + (col + i))
//             } else {
//                 newShipLocations.push((row + i) + '' + col)
//             }
//         }

//         return newShipLocations
//     },

//     collision: function(locations) {
//         for(var i = 0; i < this.numShips; i++) {
//             var ship = this.ships[i]
//             for(var j = 0; j < locations.length; j++) {
//                 if(ship.locations.indexOf(locations[j] >= 0)) {
//                     return true
//                 }
//             }
//         }
//         return false
//     }

// }

var controller = {
    guesses: 0,

    processGuess: function(guess) {
        var locations = parseGuess(guess)
        if(locations) {
            this.guesses++
            var hit = model.fire(locations)

            if(hit && model.shipSunk === model.numShips) {
                view.displayMessage('YOU WIN!!!' + 'Battleships sank of ' + this.guesses + 'guess!')
            }
        }
    }
}

function parseGuess(guess) {
    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

    if(guess === null || guess.length !== 2) {
        alert('Not comfort coordinate!')
    } else {
        firstChar = guess.charAt(0)
        var row = alphabet.indexOf(firstChar)
        var column = guess.charAt(1)
        
        if(isNaN(row) || isNaN(column)){
            alert('Not comfort coordinate!')
        } else if(row < 0 || row >= model.boadrSize || column < 0 || column >= model.boadrSize) {
            alert('Not comfort coordinate!')
        } else {
            return row + column
        }
    }
    return null
}

function init() {
    var fireButton = document.getElementById('fireButton')
    fireButton.onclick = handleFireButton

    var guessInput = document.getElementById('guessInput')
    guessInput.onkeypress = handKeyPress

    model.generateShipLocations()
}


function handleFireButton() {
    var guessInput = document.getElementById('guessInput')
    var guess = guessInput.value
    controller.processGuess(guess)
    guessInput.value = ''
}

function handKeyPress(event) {
    var fireButton = document.getElementById('fireButton')
    if (event.keyCode === 13) {
        fireButton.click()
        return false
    }
}

window.onload =  init