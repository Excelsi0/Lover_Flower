import "/src/sass/style.scss";

// скрипт ИИ для поиска
const search = document.querySelector(".js-search");
const openSearchBtn = document.querySelector(".js-search-trigger");
const closeSearchBtn = document.querySelector(".js-close-search");
const searchInput = document.querySelector(".search__input");
const phoneElement = document.querySelector(".header__phone"); // Получаем элемент телефона

openSearchBtn.addEventListener("click", () => {
    search.classList.add("active");
    searchInput.focus();
    phoneElement.style.display = "none"; // Просто скрываем телефон
});

closeSearchBtn.addEventListener("click", () => {
    search.classList.remove("active");
    phoneElement.style.display = "flex"; // Возвращаем телефон
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".search")) {
        search.classList.remove("active");
        phoneElement.style.display = "flex"; // Возвращаем телефон
    }
});
