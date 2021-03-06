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
