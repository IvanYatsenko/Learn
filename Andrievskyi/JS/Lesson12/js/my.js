var chevi = {
    make: 'Chevi',
    model: 'Aveo',
    year: 2010,
    color: 'red',
    passengers: 4,
    fuel: 0,
    convertible: false,
    mileage: 1021,
    started: false,
    start: function() {
        if(this.fuel>0){
        this.started = true
        } else {
            console.log('Fuel empty')
        }
    },
    stop: function() {
        this.started = false
    },

    drive: function() {
        if(this.fuel > 0){
            if(this.started){
                console.log("Drive")
            }else{
                console.log('Not started engene')
            }
        } else {
            console.log('Fuel empty')
        }
    },

    light: function() {
        console.log('Light ON')
    },

    addFuel: function(amount) {
        this.fuel = this.fuel+amount
    }

};

 chevi.addFuel(9)


chevi.drive()
