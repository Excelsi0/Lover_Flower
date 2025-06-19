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

// Изначально копируем текст
stickyTitle.textContent = heroTitle.textContent;

// Разбиваем текст на строки (ваш существующий код)
const words = heroTitle.textContent.split(" ");
heroTitle.innerHTML = words.map((word) => `<span>${word}</span>`).join("<br>");

window.addEventListener("scroll", () => {
    const heroRect = heroTitle.getBoundingClientRect();
    const scrollRatio = Math.min(1, Math.max(0, -heroRect.top / heroRect.height));

    if (heroRect.top < window.innerHeight * 0.8) {
        // Плавное появление шапки
        header.style.opacity = scrollRatio;
        header.classList.toggle("visible", scrollRatio > 0.5);

        // Плавное уменьшение основного заголовка
        heroTitle.style.transform = `scale(${1 - scrollRatio * 0.5}) translateY(${-scrollRatio * 50}px)`;
        heroTitle.style.opacity = 1 - scrollRatio;

        // Плавное увеличение заголовка в шапке
        stickyTitle.style.transform = `scale(${0.5 + scrollRatio * 0.5})`;
        stickyTitle.style.opacity = scrollRatio;
    } else {
        // Сброс стилей при возврате назад
        heroTitle.style.transform = "";
        heroTitle.style.opacity = "";
    }
});
