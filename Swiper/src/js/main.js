new Swiper('.slider-front', {
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
    },
    slidesPerView: 2,
    slidesPerColumn: 2,
});


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    grid: {
      rows: 2,
    },
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
