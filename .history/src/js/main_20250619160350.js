import "/src/sass/style.scss";

// скрипт ИИ для поиска

const search = document.querySelector(".js-search");
const openSearchBtn = document.querySelector(".js-search-trigger");
const closeSearchBtn = document.querySelector(".js-close-search");
const searchInput = document.querySelector(".search__input");
const header = document.querySelector(".header");

// Открытие поиска
function openSearch() {
    search.classList.add("active");
    header.classList.add("search-active");
    searchInput.focus();
}

// Закрытие поиска
function closeSearch() {
    search.classList.remove("active");
    header.classList.remove("search-active");
}

// Клик по кнопке открытия
openSearchBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // чтобы клик не дошёл до document
    openSearch();
});

// Клик по кнопке закрытия
closeSearchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeSearch();
});

// Клик вне блока поиска
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search")) {
        closeSearch();
    }
});

const bgHeader = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        // Если прокрутка больше 10px
        bgHeader.style.background = "#040a0a";
    } else {
        bgHeader.style.background = "rgba(0, 0, 0, 0)";
    }
});

window.addEventListener("scroll", function () {
    const textElement = document.getElementById("hero__title");
    const scrollPosition = window.scrollY;

    // Размер шрифта (от 50px до 20px)
    let newSize = 50 - scrollPosition * 0.3;
    newSize = Math.max(20, newSize);

    // Позиция top (от 50px до 10px)
    let newTop = -42 - scrollPosition * 0.2;
    newTop = Math.max(-30, newTop);

    // Применяем изменения
    textElement.style.fontSize = `${newSize}px`;
    textElement.style.top = `${newTop}px`;
});
