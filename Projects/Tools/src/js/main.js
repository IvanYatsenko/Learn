document.addEventListener('DOMContentLoaded', function() {

// select

  const select = document.querySelector('.select')
  const arrow = document.querySelector('.select__arrow')
  const value = document.querySelector('.select__value')

  setup()

  function open() {
    select.classList.add('select_open')
    arrow.classList.remove('arrow_down')
    arrow.classList.add('arrow_up')

  }

  function close() {
    select.classList.remove('select_open')
    arrow.classList.remove('arrow_up')
    arrow.classList.add('arrow_down')
  }

  function toggle() {
    select.classList.contains('select_open') ? close() : open()
  }

  function selectItem(id) {
    const item = select.querySelector(`[data-id="${id}"]`)
    value.textContent = item.textContent
    const itemsSelect = select.querySelectorAll('.select__item_selected')
    if (itemsSelect.length !== 0) {
      itemsSelect.forEach(item => item.classList.remove('select__item_selected'))
    }
    item.classList.add('select__item_selected')
    close()
  }

  function setup() {
    select.addEventListener('click', function(event) {
      const {type} = event.target.dataset
      if(type === 'input') {
        toggle()
      } else if(type === 'item') {
        const id = event.target.dataset.id
        selectItem(id)
      }
    })
  }
})

// Map

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [48.872185, 2.354224],
          zoom: 15
      }, {
          searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Это красивая метка'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'images/myIcon.gif',
          // Размеры метки.
          iconImageSize: [30, 42],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38]
      }),

      myPlacemarkWithContent = new ymaps.Placemark([48.872185, 2.354224], {
          hintContent: 'Франция, Иль-де-Франс, Париж, X округ Парижа, улица дю Фобур Сен Дени  54',
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#imageWithContent',
          // Своё изображение иконки метки.
          iconImageHref: 'src/img/point.png',
          // Размеры метки.
          iconImageSize: [28, 40],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-24, -24],
          // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [15, 15],
          // Макет содержимого.
          iconContentLayout: MyIconContentLayout
      });

  myMap.geoObjects
      .add(myPlacemark)
      .add(myPlacemarkWithContent);
});

// Form

var selector = document.querySelector("input[type='tel']")
var im = new Inputmask("+7 (999)-999-99-99")

im.mask(selector)

const validate = new window.JustValidate('#form');
const validation = new JustValidate('#form');

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите имя',
    },
    {
      rule: 'minLength',
      value: 2,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])

  .addField('#tel', [
    {
      validator: function(name, value) {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
  ])

  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Введите Email',
    },
    {
      rule: 'email',
      errorMessage: 'Email is invalid!',
    },
  ]);


  // Tooltip
    tippy('.tooltip', {
      content: 'Глава 2, страница 176',
    });
