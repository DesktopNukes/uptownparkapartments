const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dots = Array.from(carousel.querySelectorAll(".carousel-dots span"));
  let current = 0;

  const showSlide = (index) => {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = index;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  };

  window.setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 4500);
});

const floorPlanImage = document.querySelector("#active-floor-plan");
const floorPlanThumbs = document.querySelectorAll(".floor-plan-thumb");

floorPlanThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    floorPlanThumbs.forEach((button) => {
      button.classList.remove("is-active");
      button.setAttribute("aria-selected", "false");
    });

    thumb.classList.add("is-active");
    thumb.setAttribute("aria-selected", "true");
    floorPlanImage.src = thumb.dataset.fullSrc;
    floorPlanImage.alt = thumb.dataset.fullAlt;
  });
});

const galleryImages = [
  {
    src: "assets/uptown glass.jfif?v=1024",
    alt: "Glass-front exterior at Uptown Park Apartments"
  },
  {
    src: "assets/uptownsign2.jpg?v=1024",
    alt: "Uptown Park Apartments monument sign"
  },
  {
    src: "assets/uptown-officedoor.png?v=1024",
    alt: "Office entrance at Uptown Park Apartments"
  },
  {
    src: "assets/uptown-pool.png?v=1024",
    alt: "Pool at Uptown Park Apartments"
  },
  {
    src: "assets/Westuptownlot.png?v=1024",
    alt: "West parking lot at Uptown Park Apartments"
  },
  {
    src: "assets/uptown-sign.jpg?v=1024",
    alt: "Uptown Park Apartments sign"
  },
  {
    src: "assets/uptown-property.jpg?v=1024",
    alt: "Exterior parking area at Uptown Park Apartments"
  },
  {
    src: "assets/uptown-backdoor.png?v=1024",
    alt: "Back entrance at Uptown Park Apartments"
  },
  {
    src: "assets/uptown back.jfif?v=1024",
    alt: "Back side of Uptown Park Apartments"
  },
  {
    src: "assets/uptown2.jpg?v=1024",
    alt: "Uptown Park Apartments exterior"
  },
  {
    src: "assets/6bd25de6-ac87-4e43-b75e-ac68d54abfdd.jpeg?v=1024",
    alt: "Parking area at Uptown Park Apartments"
  },
  {
    src: "assets/7b6d4ba9-8269-4a82-9dd8-705595dcc7b5.jpeg?v=1024",
    alt: "Side parking at Uptown Park Apartments"
  },
  {
    src: "assets/lovelivinghere.png?v=1024",
    alt: "Love living here at Uptown Park Apartments"
  }
];

const galleryImage = document.querySelector("#gallery-active-image");
const galleryPrevious = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
let galleryIndex = 0;

const showGalleryImage = (index) => {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  galleryImage.src = galleryImages[galleryIndex].src;
  galleryImage.alt = galleryImages[galleryIndex].alt;
};

galleryPrevious?.addEventListener("click", () => {
  showGalleryImage(galleryIndex - 1);
});

galleryNext?.addEventListener("click", () => {
  showGalleryImage(galleryIndex + 1);
});

const navLinks = Array.from(document.querySelectorAll(".primary-nav a"));
const navTargets = navLinks
  .map((link) => ({
    link,
    target:
      link.getAttribute("href") === "#apply"
        ? document.querySelector(".resident-info-band")
        : document.querySelector(link.getAttribute("href"))
  }))
  .filter((item) => item.target);

let navTicking = false;

const updateActiveNavLink = () => {
  const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
  const viewportBottom = window.innerHeight;
  let activeItem = navTargets[0];
  let activeVisibleHeight = 0;

  navTargets.forEach((item) => {
    const rect = item.target.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, headerHeight);
    const visibleBottom = Math.min(rect.bottom, viewportBottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    if (visibleHeight > activeVisibleHeight) {
      activeItem = item;
      activeVisibleHeight = visibleHeight;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link === activeItem.link;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  navTicking = false;
};

const requestActiveNavUpdate = () => {
  if (!navTicking) {
    window.requestAnimationFrame(updateActiveNavLink);
    navTicking = true;
  }
};

window.addEventListener("scroll", requestActiveNavUpdate, { passive: true });
window.addEventListener("resize", requestActiveNavUpdate);
updateActiveNavLink();
