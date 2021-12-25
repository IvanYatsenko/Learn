
// var location1 = Math.floor(Math.random() * 5);
// var location2 = location1 + 1;
// var location3 = location2 + 1;

// var guess;
// var hits = 0;
// var guesses = 0;
// var isSunk = false;

// while (isSunk == false) {
//     guess = prompt('Fire at 0 to 6:');
//     if (guess < 0 || guess > 6) {
//         alert('Number at 0 to 6!')
//     } else {
//         guesses = guesses + 1;
//         if (guess == location1 || guess == location2 || guess == location3) {
//             hits = hits + 1;
//             if (hits == 3) {
//                 isSunk = true;
//                 alert('You win!')
//             }
//         } else {
//             alert('you dont hits')
//         }
//     }
// }

// var status = `You hits ${guesses} to ship!`;
// alert(status);

var i = 0;

while(i < 4) {
    output = i;
    console.log(output);
    i++;
}

for(var i = 0; i < 4; i++) {
    output = i;
    console.log(output);
}
