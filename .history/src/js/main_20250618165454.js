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

const heroTitle = document.querySelector(".js-sticky-title");
const stickyTitle = document.querySelector(".header__sticky-title");
const headerHeight = 70; // должен совпадать с CSS высотой header

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const heroOffsetTop = heroTitle.offsetTop;

    if (scrollY + headerHeight >= heroOffsetTop) {
        stickyTitle.textContent = heroTitle.textContent;
        stickyTitle.classList.add("sticky-visible");
        heroTitle.classList.add("shrink");
    } else {
        stickyTitle.classList.remove("sticky-visible");
        heroTitle.classList.remove("shrink");
    }
});
