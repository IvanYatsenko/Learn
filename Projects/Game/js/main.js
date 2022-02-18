(function () {

  const container = document.querySelector('.container');

  let dataCards = [];
  let cardsCheck = [];
  let count = 0

  function createData() {
  for(let i = 0; i < 8; i++) {
    dataCards.push(i);
  };

  dataCards = dataCards.concat(dataCards);
  dataCards.sort(()=>Math.random()-0.5);
  };

  function createCards(gameDiv) {
    for(let i = 0; i < 16; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.id = i;
      gameDiv.append(card);
    };
  };

  function createTitle(name) {
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = name;
    return title;
  };

  function createGameContainer(container) {
    const app = document.createElement('div');
    app.classList.add('app');

    const title = createTitle('Игра в карточки');

    const gameDiv = document.createElement('div');
    gameDiv.classList.add('game');

    const btnResume = document.createElement('button');
    btnResume.classList.add('btn');
    btnResume.classList.add('hide');
    btnResume.textContent = 'Cыграть еще раз!';
    btnResume.addEventListener('click', function() {
      location.reload();
    });

    app.append(title);
    app.append(gameDiv);
    app.append(btnResume);
    createCards(gameDiv);
    createData();

    container.append(app);
  };


  createGameContainer(container);

  document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', function() {
      card.classList.add('card_check');
      checkCards(card);
      setTimeout(function() {
        card.textContent = dataCards[card.id];
      }, 150);
    });
  });

  function checkCards(card) {
    cardsCheck.push(card);
    if (cardsCheck.length == 2) {
      equalCard();
    };
  };

  function refreshGame() {
    if(count > 7) {
      document.querySelector('.btn').classList.remove('hide');
    };
  };

  function equalCard() {
    if(dataCards[cardsCheck[0].id] == dataCards[cardsCheck[1].id]) {
      setTimeout(function() {
      cardsCheck[0].classList.add('card_win');
      cardsCheck[1].classList.add('card_win');
      count++;
      refreshGame();
      }, 350);
    };

    setTimeout(function() {
    cardsCheck[0].textContent = '';
    cardsCheck[0].classList.remove('card_check');
    cardsCheck[1].textContent = '';
    cardsCheck[1].classList.remove('card_check');
    cardsCheck = [];
    }, 350);

  };

})()
