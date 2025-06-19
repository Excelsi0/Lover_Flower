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
const header = document.querySelector(".header"); // Если есть шапка
const startFontSize = 50; // Совпадает с CSS
const endFontSize = 24; // Размер в шапке
const scrollThreshold = 150; // Когда начинать уменьшение

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY <= scrollThreshold) {
        // Плавное уменьшение font-size
        const fontSize = startFontSize - (scrollY / scrollThreshold) * (startFontSize - endFontSize);
        title.style.fontSize = `${fontSize}px`;

        // Плавное поднятие текста
        const translateY = -scrollY / 3;
        title.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;

        // Плавное появление шапки (если нужно)
        if (header) header.style.opacity = (scrollY / scrollThreshold).toFixed(2);
    } else {
        // Фиксируем минимальные значения
        title.style.fontSize = `${endFontSize}px`;
        if (header) header.style.opacity = "0";
    }
});
