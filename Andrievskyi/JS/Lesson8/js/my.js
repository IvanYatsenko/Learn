
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

var array = [60, 50, 60, 58, 54, 54, 58, 50, 52, 54];

var slution1 = array[1];

var flavors = ['vanilia', 'late', 'chocolate'];

var numbFlavors = flavors.length;

console.log(numbFlavors);

function makePhrases() {
    var words1 = ['24/7', 'Каждый день', 'Сегодня', 'Постоянно', 'Непрерывно']
    var words2 = ['мы', 'команда', 'компания', 'сотрудники', 'персонал'];
    var words3 = ['работает не покладая рук', 'отдыхает на работе', 'делает чудеса'];

    var random1 = Math.floor(Math.random() * words1.length);
    var random2 = Math.floor(Math.random() * words2.length);
    var random3 = Math.floor(Math.random() * words3.length);

    console.log(`${words1[random1]} ${words2[random2]} ${words3[random3]}`);
}

makePhrases();
makePhrases();
makePhrases();
makePhrases();
makePhrases();
makePhrases();
makePhrases();
makePhrases();
makePhrases();
makePhrases();
makePhrases();
makePhrases();
makePhrases();
makePhrases();