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

view.displayMessage('OK')
view.displayMiss('23')
view.displayHit('32')