import "/src/sass/style.scss";

const searchTrigger = document.querySelector(".header__search-trigger");
const searchBox = document.querySelector(".header__search-box");
const searchInput = document.querySelector(".header__search-input");
const searchClose = document.querySelector(".header__search-close");

searchTrigger.addEventListener("click", () => {
    searchTrigger.style.display = "none";
    searchBox.classList.add("header__search-box--active");
    searchInput.focus();
});

searchClose.addEventListener("click", () => {
    searchTrigger.style.display = "flex";
    searchBox.classList.remove("header__search-box--active");
});
