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
    if (window.innerWidth > 768) return;
    const textElement = document.getElementById("hero__title");
    const scrollPosition = window.scrollY;
    const scrollRange = 0; // На сколько px прокрутки растянуть анимацию

    // 1. Анимация положения (top)
    const startTop = -42; // Начальная позиция
    const endTop = -35; // Конечная позиция
    let newTop;

    if (scrollPosition <= 0) {
        newTop = startTop;
    } else if (scrollPosition >= scrollRange) {
        newTop = endTop;
    } else {
        // Плавный расчет между startTop и endTop
        newTop = startTop + (endTop - startTop) * (scrollPosition / scrollRange);
    }

    // 2. Анимация размера текста (font-size)
    const startSize = 50; // Начальный размер
    const endSize = 20; // Конечный размер
    let newSize;

    if (scrollPosition <= 0) {
        newSize = startSize;
    } else if (scrollPosition >= scrollRange) {
        newSize = endSize;
    } else {
        // Плавный расчет между startSize и endSize
        newSize = startSize - (startSize - endSize) * (scrollPosition / scrollRange);
    }

    // Применяем все изменения
    textElement.style.top = `${newTop}px`;
    textElement.style.fontSize = `${newSize}px`;
});
