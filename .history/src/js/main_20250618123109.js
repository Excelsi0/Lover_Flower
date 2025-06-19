import "/src/sass/style.scss";

// скрипт ИИ для поиска
const search = document.querySelector(".js-search");
const openSearchBtn = document.querySelector(".js-search-trigger");
const closeSearchBtn = document.querySelector(".js-close-search");
const searchInput = document.querySelector(".search__input");
const phoneElement = document.querySelector(".header__phone"); // Добавляем элемент телефона

// Функция для управления видимостью телефона
const togglePhoneVisibility = (show) => {
    if (show) {
        phoneElement.style.display = "flex"; // Или ваш исходный display-режим
        phoneElement.style.opacity = "1";
        phoneElement.style.width = "auto";
    } else {
        phoneElement.style.display = "none";
        phoneElement.style.opacity = "0";
        phoneElement.style.width = "0";
    }
};

openSearchBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Предотвращаем всплытие
    search.classList.add("active");
    searchInput.focus();
    togglePhoneVisibility(false); // Скрываем телефон
});

closeSearchBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Предотвращаем всплытие
    search.classList.remove("active");
    togglePhoneVisibility(true); // Показываем телефон
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".search")) {
        search.classList.remove("active");
        togglePhoneVisibility(true); // Показываем телефон при клике вне поиска
    }
});

// Возвращаем телефон при нажатии Escape
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        search.classList.remove("active");
        togglePhoneVisibility(true);
    }
});
