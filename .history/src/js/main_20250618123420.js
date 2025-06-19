import "/src/sass/style.scss";

// скрипт ИИ для поиска

const search = document.querySelector(".js-search");
const openSearchBtn = document.querySelector(".js-search-trigger");
const closeSearchBtn = document.querySelector(".js-close-search");
const searchInput = document.querySelector(".search__input");

openSearchBtn.addEventListener("click", () => {
    search.classList.add("active");
    searchInput.focus();
});

closeSearchBtn.addEventListener("click", () => {
    search.classList.remove("active");
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".search")) {
        search.classList.remove("active");
    }
});

document.querySelector(".js-search-trigger").addEventListener("click", () => {
    document.querySelector(".search").classList.add("active");
    document.querySelector(".header").classList.add("search-active");
});
document.querySelector(".js-close-search").addEventListener("click", () => {
    document.querySelector(".search").classList.remove("active");
    document.querySelector(".header").classList.remove("search-active");
});
