var view = {
    displayMessage: function(message) {
        var messageArea = document.querySelector('#messageArea')
        messageArea.innerHTML = message
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
            location = ship.location
            var index = location.indexOf(guess)
            if(index >= 0) {
                ship.hits[index] = 'hit'
                return true
            }
        }
        return false
    }
}