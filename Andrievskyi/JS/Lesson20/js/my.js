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
    boadrSize: 7,
    numShips: 3,
    shipLenght: 3,
    shipSunk: 0, 

    ships: [
        ship1 = { location: ['10', '20', '30'], hits: ['', '', '']},
        ship2 = { location: ['32', '33', '34'], hits: ['', '', '']},
        ship3 = { location: ['63', '64', '65'], hits: ['', '', '']}
    ],

    fire: function(guess) {
        for(var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i]
            var index = ship.location.indexOf(guess)
            if(index >= 0) {
                ship.hits[index] = 'hit'
                view.displayHit(guess)
                view.displayMessage('HIT!!!')
                if(this.isSunk(ship)) {
                    view.displayMessage('BATTLESHIP is SUNK!!!')
                    this.shipSunk++
                }
                return true
            }
        }
        view.displayMiss(guess)
        view.displayMessage('You missed!')
        return false
    },

    isSunk: function(ship) {
        for(var i = 0; i < this.shipLenght; i++) {
            if(ship.hits[i] !== 'hit') {
                return false
            }
        }
        return true
    }
}

var controller = {
    guesses: 0,

    processGuess: function(guess) {
        var location = parseGuess(guess)
        if(location) {
            this.guesses++
            var hit = model.fire(location)

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