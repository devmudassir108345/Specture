document.querySelectorAll(".slider-wrapper").forEach((wrapper) => {
  let slidesPerView = parseInt(wrapper.getAttribute("data-slides")) || 1;
  let slideSpace = parseInt(wrapper.getAttribute("data-space")) || 1;
  let swiperContainer = wrapper.querySelector(".swiper-container");
  let slides = swiperContainer.querySelectorAll(".swiper-slide");
  let loop = wrapper.getAttribute("data-loop") === "true"; // ✅ Check loop value

  function updateActiveSlides(swiper) {
    slides.forEach((slide) => slide.classList.remove("active"));
    let activeIndices = [];
    for (let i = 0; i < slidesPerView; i++) {
      let index = (swiper.realIndex + i) % slides.length;
      activeIndices.push(index);
    }
    activeIndices.forEach((index) => slides[index].classList.add("active"));
  }


  let herSlider = new Swiper(".hero__slider", {
    slidesPerView: 1,
    spaceBetween:0 ,
    loop: false,
    speed: 1000,
    delay: 1000,
    navigation: {
      nextEl: ".hero__btn-next",
      prevEl: ".hero__btn-prev",
    },
   

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    on: {
      init: function () {
        updateActiveSlides(this);
        // Animate on init
        const activeSlide = this.el.querySelector(
          ".swiper-slide-active .hero__slide-content"
        );
        if (activeSlide) activeSlide.classList.add("fade-in");
      },
      slideChangeTransitionStart: function () {
        const allContents = this.el.querySelectorAll(".hero__slide-content");
        allContents.forEach((el) => {
          el.classList.remove("fade-in");
        });
      },
      slideChangeTransitionEnd: function () {
        updateActiveSlides(this);
        const activeSlide = this.el.querySelector(
          ".swiper-slide-active .hero__slide-content"
        );
        if (activeSlide) activeSlide.classList.add("fade-in");
      },
    },
  });

  let swiper = new Swiper(swiperContainer, {
    slidesPerView: 1,
    spaceBetween: slideSpace,
    loop: loop,
    speed: 1000,
    delay: 1000,
    navigation: {
      nextEl: wrapper.querySelector(".btn-next"),
      prevEl: wrapper.querySelector(".btn-prev"),
    },
    breakpoints: {
      
      
      768: {
        slidesPerView: 2,
        
      },
      1024: {
        slidesPerView: slidesPerView,
        
      },
      1280: {
        slidesPerView: slidesPerView,
        
      },
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    on: {
      init: function () {
        updateActiveSlides(this);
        // Animate on init
        const activeSlide = this.el.querySelector(
          ".swiper-slide-active .hero__slide-content"
        );
        if (activeSlide) activeSlide.classList.add("fade-in");
      },
      slideChangeTransitionStart: function () {
        const allContents = this.el.querySelectorAll(".hero__slide-content");
        allContents.forEach((el) => {
          el.classList.remove("fade-in");
        });
      },
      slideChangeTransitionEnd: function () {
        updateActiveSlides(this);
        const activeSlide = this.el.querySelector(
          ".swiper-slide-active .hero__slide-content"
        );
        if (activeSlide) activeSlide.classList.add("fade-in");
      },
    },
  });
});

