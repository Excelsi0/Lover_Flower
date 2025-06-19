import "/src/sass/style.scss";

// // скрипт ИИ для поиска
// document.querySelector(".search__icon").addEventListener("click", function () {
//     const search = document.querySelector(".search");
//     const header = document.querySelector(".header");
//     search.classList.toggle("active");
//     header.classList.toggle("search-active");

//     if (search.classList.contains("active")) {
//         document.querySelector(".search__input input").focus();
//     }
// });

// document.addEventListener("click", function (e) {
//     const search = document.querySelector(".search");
//     const header = document.querySelector(".header");
//     if (!e.target.closest(".search")) {
//         search.classList.remove("active");
//         header.classList.remove("search-active");
//     }
// });

const header = document.querySelector(".header");
const openSearchBtn = document.querySelector(".js-search-trigger");
const closeSearchBtn = document.querySelector(".js-close-search");
const searchInput = document.querySelector(".search__input");

openSearchBtn.addEventListener("click", () => {
    header.classList.add("search-active");
    searchInput.focus();
});

closeSearchBtn.addEventListener("click", () => {
    header.classList.remove("search-active");
});

document.addEventListener("click", (e) => {
    const insideSearch = e.target.closest(".search__overlay");
    const trigger = e.target.closest(".js-search-trigger");
    if (!insideSearch && !trigger) {
        header.classList.remove("search-active");
    }
});
