import "/src/sass/style.scss";

// скрипт ИИ для поиска

// const search = document.querySelector(".js-search");
// const openSearchBtn = document.querySelector(".js-search-trigger");
// const closeSearchBtn = document.querySelector(".js-close-search");
// const searchInput = document.querySelector(".search__input");
// const header = document.querySelector(".header");

// // Открытие поиска
// function openSearch() {
//     search.classList.add("active");
//     header.classList.add("search-active");
//     searchInput.focus();
// }

// // Закрытие поиска
// function closeSearch() {
//     search.classList.remove("active");
//     header.classList.remove("search-active");
// }

// // Клик по кнопке открытия
// openSearchBtn.addEventListener("click", (e) => {
//     e.stopPropagation(); // чтобы клик не дошёл до document
//     openSearch();
// });

// // Клик по кнопке закрытия
// closeSearchBtn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     closeSearch();
// });

// // Клик вне блока поиска
// document.addEventListener("click", (e) => {
//     if (!e.target.closest(".search")) {
//         closeSearch();
//     }
// });
const heroTitle = document.getElementById("hero__title");
const stickyTitle = document.querySelector(".header__sticky-title");
const header = document.querySelector(".header");

// Изначально скрываем шапку
header.style.opacity = 0;

// Создаем клон заголовка для анимации
const titleClone = heroTitle.cloneNode(true);
titleClone.style.position = "fixed";
titleClone.style.top = "0";
titleClone.style.left = "0";
titleClone.style.width = "100%";
titleClone.style.textAlign = "center";
titleClone.style.pointerEvents = "none";
titleClone.style.zIndex = "1000";
titleClone.style.transformOrigin = "center";
document.body.appendChild(titleClone);

// Анимация при скролле
gsap.to(titleClone, {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
    },
    fontSize: "24px",
    y: 30,
    opacity: 0,
    onUpdate: () => {
        stickyTitle.textContent = heroTitle.textContent;
        header.style.opacity = 1 - titleClone.style.opacity;
    },
    onComplete: () => {
        titleClone.remove();
    },
});
