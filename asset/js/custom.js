document.querySelectorAll(".accordion").forEach((accordion) => {
  const items = accordion.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    const inner = item.querySelector(".accordion-inner");
    const arrow = item.querySelector(".accordion-arrow");

    // Set height if default active
    if (item.classList.contains("active")) {
      content.style.height = inner.scrollHeight + "px";
    }

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      items.forEach((i) => {
        i.classList.remove("active");
        i.querySelector(".accordion-content").style.height = 0;
      });

      if (!isOpen) {
        item.classList.add("active");
        content.style.height = inner.scrollHeight + "px";
      }
    });
  });

  window.addEventListener("resize", () => {
    items.forEach((item) => {
      const content = item.querySelector(".accordion-content");
      const inner = item.querySelector(".accordion-inner");
      if (item.classList.contains("active")) {
        content.style.height = inner.scrollHeight + "px";
      }
    });
  });
});

const titles = document.querySelectorAll(".team__title");

titles.forEach((title) => {
  title.addEventListener("click", () => {
    const item = title.parentElement;
    const content = item.querySelector(".team__content"); // 🔹 Assume content class for products

    // Close other items
    document.querySelectorAll(".team__item").forEach((i) => {
      const itemContent = i.querySelector(".team__content");
      if (i !== item) {
        i.classList.remove("active");
        if (itemContent) itemContent.style.maxHeight = null; // 🔹 Remove height from other items
      }
    });

    // Toggle current item
    if (item.classList.contains("active")) {
      if (content) content.style.maxHeight = null;
    } else {
      if (content) content.style.maxHeight = content.scrollHeight + "px"; // 🔹 Set custom height
    }

    item.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const sidebar = document.querySelector(".sidebar");
  const menu = document.querySelector(".menu");
  const closeBtn = document.querySelectorAll(".sidebar__close");
  const overlay = document.querySelector(".overlay");
  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const toggleSubDropdowns = document.querySelectorAll(".toggle-sub-dropdown");
  const html = document.querySelector("html")

  const closeSidebar = () => {
    sidebar.classList.toggle("active");
    menu.classList.toggle("menu__hidden");
    overlay.classList.toggle("overlay__hidden");
    html.classList.toggle("overflow-hidden")
  };

  closeBtn.forEach((btn) => {
    btn.addEventListener("click", closeSidebar);
  });
  overlay.addEventListener("click", closeSidebar);

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      menu.classList.toggle("menu__hidden");
      overlay.classList.toggle("overlay__hidden");
      html.classList.toggle("overflow-hidden")
    });
  }

  function addBackButtonAndTitle(dropdown, titleText) {
    const sidebarBack = document.createElement("div");
    sidebarBack.classList.add("sidebar-back");

    const backButton = document.createElement("button");
    backButton.classList.add("back-btn");
    backButton.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = titleText;

    sidebarBack.appendChild(backButton);
    sidebarBack.appendChild(title);

    dropdown.insertAdjacentElement("afterbegin", sidebarBack);

    backButton.addEventListener("click", () => {
      dropdown.classList.remove("active");
    });
  }

  // === Handle Dropdowns ===
  toggleDropdowns.forEach((toggle) => {
    const dropdown = toggle.nextElementSibling;
    const titleText = toggle.textContent.trim();

    addBackButtonAndTitle(dropdown, titleText);

    if (!toggle.querySelector(".fa-arrow-right")) {
      const arrowIcon = document.createElement("i");
      arrowIcon.className = "fa-solid fa-arrow-right";
      arrowIcon.style.marginLeft = "8px";
      arrowIcon.style.cursor = "pointer";
      toggle.appendChild(arrowIcon);

      arrowIcon.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // stop anchor
        if (window.innerWidth < 1200) {
          dropdown.classList.add("active");
        }
      });
    }
  });

  // === Handle Sub-Dropdowns (Same like Dropdowns now) ===
  toggleSubDropdowns.forEach((toggle) => {
    const subDropdown = toggle.nextElementSibling;
    const titleText = toggle.textContent.trim();

    addBackButtonAndTitle(subDropdown, titleText);

    if (!toggle.querySelector(".fa-arrow-right")) {
      const arrowIcon = document.createElement("i");
      arrowIcon.className = "fa-solid fa-arrow-right";
      arrowIcon.style.marginLeft = "8px";
      arrowIcon.style.cursor = "pointer";
      toggle.appendChild(arrowIcon);

      arrowIcon.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // prevent anchor default
        if (window.innerWidth < 1200) {
          subDropdown.classList.add("active");
        }
      });
    }
  });
});

var swiper2 = new Swiper(".mySwiper", {
  spaceBetween: 3,
  slidesPerView: 3,
  slidesPerGroup: 4,
  //centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 6,
    },

    1280: {
      slidesPerView: 7,
    },
  },
  speed: 9000,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".btn-next",
    prevEl: ".btn-prev",
  },
});

$(".swiper-slide").hover(
  function () {
    swiper2.autoplay.stop();
  },
  function () {
    swiper2.autoplay.start();
  }
);

// Initialize fancybox for the gallery
Fancybox.bind('[data-fancybox="gallery"]', {
  Thumbs: {
    autoStart: true, // show thumbnails automatically
  },
  Toolbar: {
    display: ["zoom", "slideshow", "fullscreen", "download", "thumbs", "close"],
  },
  animated: true,
  showClass: "fancybox-zoomIn",
  hideClass: "fancybox-zoomOut",
});

document.querySelectorAll(".video__play-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const videoUrl = this.getAttribute("data-src");

    if (videoUrl) {
      Fancybox.show([{ src: videoUrl, type: "video" }], {
        Toolbar: false,
        smallBtn: true,
        video: { autoStart: true },
      });
    } else {
      console.error("Video URL not found!");
    }
  });
});
