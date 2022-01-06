var chevi = {
    make: 'Chevi',
    model: 'Aveo',
    year: 2010,
    color: 'red',
    passengers: 4,
    convertible: false,
    mileage: 1021,
    started: false,
    start: function() {
        this.started = true
    },
    stop: function() {
        this.started = false
    },
    light: function() {
        console.log('Light ON')
    }
};

