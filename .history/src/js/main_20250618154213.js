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

// Клонируем заголовок для анимации
const titleClone = heroTitle.cloneNode(true);
titleClone.id = "title-clone";
titleClone.style.position = "absolute";
titleClone.style.top = heroTitle.offsetTop + "px";
titleClone.style.left = heroTitle.offsetLeft + "px";
titleClone.style.width = heroTitle.offsetWidth + "px";
titleClone.style.transition = "all 0.5s cubic-bezier(0.33, 1, 0.68, 1)";
document.body.appendChild(titleClone);

window.addEventListener("scroll", () => {
    const heroRect = heroTitle.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();

    if (heroRect.top < 0) {
        // Анимируем клон к позиции шапки
        titleClone.style.top = `${headerRect.top + 10}px`;
        titleClone.style.left = "50%";
        titleClone.style.transform = "translateX(-50%) scale(0.6)";
        titleClone.style.opacity = "0";

        // Показываем шапку
        stickyTitle.textContent = heroTitle.textContent;
        header.style.opacity = "1";
    } else {
        // Возвращаем клон на место
        titleClone.style.top = heroTitle.offsetTop + "px";
        titleClone.style.left = heroTitle.offsetLeft + "px";
        titleClone.style.transform = "none";
        titleClone.style.opacity = "1";

        // Скрываем шапку
        header.style.opacity = "0";
    }
});
