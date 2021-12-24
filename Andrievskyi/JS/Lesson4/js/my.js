var x = prompt('Введите первое число', 100);
var y = prompt('Введите второе число', 100);
var z = prompt('Введите 1 для "+", 2 для "-", 3 чтобы умножить и 4 для деления.');

x = parseInt(x);
y = parseInt(y);

var result;

switch(z) {
    case '1': result = x + y;
    break;
    case '2': result = x - y;
    break;
    case '3': result = x * y;
    break;
    case '4': result = x / y;
    break;
    default: result = 'Неверные данные!';
}

alert(result);