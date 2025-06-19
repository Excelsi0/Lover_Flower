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
const title = document.getElementById("heroTitle");
const headerTitle = document.querySelector(".header__sticky-title"); // Если есть заголовок в шапке

window.addEventListener("scroll", () => {
    const shrinkPoint = 150;
    const scrollY = window.scrollY;

    // Параметры анимации
    const scale = Math.max(0.5, 1 - scrollY / shrinkPoint);
    const translateY = Math.min(50, scrollY / 3);

    // Центрирование остаётся стабильным (50% - половина ширины элемента)
    const translateX = -50;

    title.style.transform = `scale(${scale}) translate(${translateX}%, -${translateY}px)`;

    // Плавное появление заголовка в шапке (если нужно)
    if (headerTitle) {
        headerTitle.style.opacity = Math.min(1, scrollY / 100);
    }
});
