
function init() {

    var par = document.getElementById('code1')

    par.innerHTML = 'Здесь был параграф!'
    
    var myClass = document.getElementsByClassName('some')
    
    console.log(myClass)    

    par.setAttribute('class', 'redtext')


}

window.onload = init;


