function app() {
  createBurgerMenu();  
  createCardSlider(); 
};

function createBurgerMenu() {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector(".navbar-menu");

  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
};

function createCardSlider() {
  const rightArrow = document.querySelector("#arrow-icon--right");
  const leftArrow = document.querySelector("#arrow-icon--left");
  const slider = document.querySelector(".slider");

  function scrollSlider(direction) {
    const scrollAmount = document.documentElement.clientWidth;;
    slider.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };
  if (rightArrow && leftArrow) {
    leftArrow.addEventListener("click", () => scrollSlider(-1));
    rightArrow.addEventListener("click", () => scrollSlider(1));
  } else {
    return;
  }
  
};

document.addEventListener('DOMContentLoaded', app);





