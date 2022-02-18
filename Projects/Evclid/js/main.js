
// Init Slider

const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  spaceBetween: 30,

  autoplay: {
    delay: 2500,
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

document.addEventListener('DOMContentLoaded', function () {

  // Search

  document.querySelector('.nav__links-button-search').addEventListener('click', function() {
    document.querySelector('.nav__search').classList.add('nav__search_show')
  })

  document.querySelector('.nav__search-btn_close').addEventListener('click', function() {
    document.querySelector('.nav__search').classList.remove('nav__search_show')
  })

  // Burger

  document.querySelector('.nav__button-burger').addEventListener('click',function() {
    document.querySelector('.nav__burger').classList.add('nav__burger_active')
  })

  document.querySelector('.nav__burger-btn-close').addEventListener('click', function() {
    document.querySelector('.nav__burger').classList.remove('nav__burger_active')
  })

  // Tabs

  document.querySelectorAll('.working__link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const path = e.currentTarget.dataset.path

      document.querySelectorAll('.working__link').forEach(function (elem) {
        elem.classList.remove('working__link_active')
        e.currentTarget.classList.add('working__link_active')

        document.querySelectorAll('.working__step').forEach(function (content) {
          content.classList.remove('working__show_active')
        })
        document.querySelectorAll('.working__step-img').forEach(function (content) {
          content.classList.remove('working__show_active')
        })

        document.querySelectorAll(`[data-target="${path}"]`).forEach(function (step) {
          step.classList.add('working__show_active')
        })

      })
    })
  })

  //  Accordion

  var accordion = document.querySelectorAll('.faq__question')

  for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
      accordion[i].querySelector('.faq__answer').classList.toggle('faq__answer_active')
      accordion[i].querySelector('.faq__link-icon').classList.toggle('faq__link-icon_active')
    })
  }

})


